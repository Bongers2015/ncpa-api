import fs from 'fs';
import path from 'path';

import Express from 'express';

import {
  Controller,
  Get,
  Request,
  Post,
  Route,
  Tags,
  SuccessResponse,
  Delete
} from 'tsoa';

import multer from 'multer';

import { MulterFile } from '../types';

const firmwareRoot = path.join(process.cwd(), 'firmwares');
const fsPromises = fs.promises;
type SomeFile = {
  filename: string;
  modified: string;
  modifiedMs: number;
  size: number;
};

const getSortedFiles = async (): Promise<Array<SomeFile>> => {
  const files = (await fs.promises
    .readdir(firmwareRoot, {
      withFileTypes: true
    })
    .then(files => {
      return Promise.all(
        files
          .filter(({ name }) => name.indexOf('.zip') !== -1)
          .map(zipFile => {
            return fs.promises
              .stat(path.join(firmwareRoot, zipFile.name))
              .then(stats => {
                return {
                  filename: zipFile.name,
                  modifiedMs: stats.mtimeMs,
                  modified: stats.mtime.toString(),
                  size: stats.size
                };
              });
          })
      );
    })).sort((a, b) => {
    if (a.modifiedMs < b.modifiedMs) {
      return 1;
    }
    if (a.modifiedMs > b.modifiedMs) {
      return -1;
    }
    return 0;
  });

  return files;
};
@Route('firmwares')
@Tags('firmwares')
export class FirmwareController extends Controller {
  /** jwt scopes: `developer`
   *
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  @Get('/latest')
  @SuccessResponse(302, 'Redirect')
  public async firmwareLatest(@Request() request: Express.Request) {
    // check if there is a firmware
    const files = await getSortedFiles();
    if (files && files.length) {
      const { filename } = files[0];

      const firmwarePath = path.join(firmwareRoot, filename);
      try {
        await fsPromises.stat(firmwarePath);
        const response = request.res as Express.Response;
        response.redirect(`${filename}`);
        return null;
      } catch (e) {
        if (e && e.code && e.code === 'ENOENT') {
          this.setStatus(404);
        }
        return e;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  @Get('/{filename}')
  public async firmwareFilename(
    filename: string,
    @Request() request: Express.Request
  ) {
    // check if there is a firmware
    const firmwarePath = path.join(firmwareRoot, filename);
    try {
      await fsPromises.stat(firmwarePath);
      const response = request.res as Express.Response;

      const mystream = fs.createReadStream(firmwarePath);
      mystream.pipe(response);
      await new Promise(resolve => {
        mystream.on('end', () => {
          response.end();
          resolve();
        });
      });
      return null;
    } catch (e) {
      if (e && e.code && e.code === 'ENOENT') {
        this.setStatus(404);
      }
      return e;
    }
  }

  @Post('/')
  public async uploadFirmware(
    @Request() request: Express.Request
  ): Promise<SomeFile> {
    const ballOfFirmware: MulterFile = await this.getFile(request, 'data');

    const firmwarePath = path.join(
      process.cwd(),
      'firmwares',
      ballOfFirmware.originalname
    );
    if (ballOfFirmware) {
      // return Promise.resolve(ballOfFirmware.originalname);
      await fs.promises.writeFile(firmwarePath, ballOfFirmware.buffer, {
        flag: 'ax+'
      });

      const stats = await fs.promises.stat(firmwarePath);

      return Promise.resolve({
        filename: ballOfFirmware.originalname,
        modifiedMs: stats.mtimeMs,
        modified: stats.mtime.toString(),
        size: stats.size
      });
    }

    return Promise.resolve(undefined);
  }

  @Get('/')
  public async firmwares(): Promise<
    Array<{
      filename: string;
      modified: string;
      modifiedMs: number;
      size: number;
    }>
  > {
    const files = await getSortedFiles();

    return Promise.resolve(files);
  }

  @Delete('/')
  public async deleteFirmwares(): Promise<string> {
    try {
      await fs.promises
        .readdir(firmwareRoot, {
          withFileTypes: true
        })
        .then(files => {
          return Promise.all(
            files
              .filter(({ name }) => name.indexOf('.zip') !== -1)
              .map(zipFile => {
                return fs.promises.unlink(
                  path.join(firmwareRoot, zipFile.name)
                );
              })
          );
        });

      return 'ok';
    } catch (e) {
      if (e && e.code && e.code === 'ENOENT') {
        this.setStatus(404);
      }
      return e;
    }
  }

  private getFileContents(
    request: Express.Request,
    name: string
  ): Promise<string> {
    const multerSingle = multer().single(name);
    return new Promise((resolve, reject) => {
      multerSingle(request, undefined, async error => {
        if (error) {
          reject(error);
        }
        if (request.file) {
          resolve(request.file.buffer.toString('utf8'));
        } else {
          resolve();
        }
      });
    });
  }

  private getFile(request: Express.Request, name: string): Promise<MulterFile> {
    const multerSingle = multer().single(name);
    return new Promise((resolve, reject) => {
      multerSingle(request, undefined, async error => {
        if (error) {
          reject(error);
        }
        if (request.file) {
          resolve(request.file);
        } else {
          resolve();
        }
      });
    });
  }
}
