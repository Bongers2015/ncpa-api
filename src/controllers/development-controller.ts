import fs from 'fs';
import path from 'path';

import unzipper from 'unzipper';
import Express from 'express';

import {
  Controller,
  Get,
  Request,
  Security,
  Post,
  Route,
  Tags,
  Body,
  SuccessResponse,
  Example,
  Query,
  Delete
} from 'tsoa';

import multer from 'multer';

import {
  CardRegistration,
  CreateCardRequest,
  QRGeneratorResponse,
  MulterFile
} from '../types';

import cpService from '../services/cp';
import { createIdToken } from '../services/qr';

const fsPromises = fs.promises;

const receivedUpgradesRoot = path.join(process.cwd(), 'received-upgrades');

@Route('development')
@Tags('developer')
export class AdminController extends Controller {
  /** jwt scopes: `developer`
   *
   * Developer endpoint for whitelisting card manually
   */
  @Post('/whitelist/cards')
  @Security('jwtAuth')
  public async addCard(
    @Body() createCardRequest: CreateCardRequest
  ): Promise<boolean> {
    return new Promise(resolve => {
      const success = cpService.addCardById(createCardRequest.token);
      if (!success) {
        this.setStatus(405);
      }

      resolve(success);
    });
  }

  /** jwt scopes: `developer`
   *
   * Set the response of the `/card` endpoint request
   */
  @Post('/card/registration-response')
  @Security('jwtAuth')
  public updateCardRegistrationResponse(
    @Body() cardRegistrationResponse: CardRegistration
  ): void {
    cpService.setCardRegistrationResponse(cardRegistrationResponse);
    /* eslint-disable-next-line */
    console.log('cardRegistrationResponse', cardRegistrationResponse);
  }

  @Post('qr-gen')
  @SuccessResponse('200', 'Returns QRGeneratorResponse')
  @Example<QRGeneratorResponse>({
    ssid: 'chargepoint_15e2b0d3c3',
    psk: 'AB/KEb0b3pu3o+K/NB3vbw',
    roles: {
      operator: {
        identityToken: 'JWT token signed with the private cert below',
        qrData:
          'Base64, encrypted data containing WiFi, installerToken, and cp meta data',
        encodedEncryptedQRPayload:
          'identityToken encoded with encodeURIComponent'
      },
      installer: {
        identityToken: 'JWT token signed with the private cert below',
        qrData:
          'Base64, encrypted data containing WiFi, installerToken, and cp meta data',
        encodedEncryptedQRPayload:
          'identityToken encoded with encodeURIComponent'
      }
    }
  })
  public async qrGenerator(
    @Request() request: Express.Request,
    @Query() chargePointId: string,
    @Query() ssid: string,
    @Query() psk: string,
    @Query() sharedSecret?: string
  ): Promise<QRGeneratorResponse> {
    const privCert = await this.getFileContents(request, 'privCert');
    const operatorStuff = await createIdToken({
      chargePointId,
      role: 'operator',
      ssid,
      psk,
      privCert,
      sharedSecret
    });
    const installerStuff = await createIdToken({
      chargePointId,
      role: 'installer',
      ssid,
      psk,
      privCert,
      sharedSecret
    });

    return Promise.resolve({
      ssid,
      psk,
      roles: {
        operator: {
          identityToken: operatorStuff.identityToken,
          qrData: operatorStuff.qrData,
          encodedEncryptedQRPayload: operatorStuff.encodedEncryptedQRPayload
        },
        installer: {
          identityToken: installerStuff.identityToken,
          qrData: installerStuff.qrData,
          encodedEncryptedQRPayload: installerStuff.encodedEncryptedQRPayload
        }
      }
    });
  }

  @Get('/upgrade-contents')
  public async upgradeContents(): Promise<
    { size: number; filename: string }[]
  > {
    // does file exist?

    const files = (await fs.promises
      .readdir(receivedUpgradesRoot, {
        withFileTypes: true
      })
      .then(files => {
        return Promise.all(
          files
            .filter(({ name }) => name.indexOf('.zip') !== -1)
            .map(zipFile => {
              return fs.promises
                .stat(path.join(receivedUpgradesRoot, zipFile.name))
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

    if (files && files.length) {
      const zipFilename = path.join(receivedUpgradesRoot, files[0].filename);
      try {
        await fsPromises.stat(zipFilename);
        const files = [];

        await fs
          .createReadStream(zipFilename)
          .pipe(unzipper.Parse())
          .on('entry', function processEntry(entry) {
            const filename = entry.path;

            const size = entry.vars.uncompressedSize; // There is also compressedSize;
            files.push({ filename, size });
            entry.autodrain();
          })
          .promise();

        return files;
      } catch (e) {
        if (e && e.code && e.code === 'ENOENT') {
          this.setStatus(404);
        }
        return e;
      }
    }
  }

  @Delete('/upgrade')
  public async deleteFirmwares(): Promise<string> {
    try {
      await fs.promises
        .readdir(receivedUpgradesRoot, {
          withFileTypes: true
        })
        .then(files => {
          return Promise.all(
            files
              .filter(({ name }) => name.indexOf('.zip') !== -1)
              .map(zipFile => {
                return fs.promises.unlink(
                  path.join(receivedUpgradesRoot, zipFile.name)
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

  @Get('/upgrade')
  public async firmwares(): Promise<
    Array<{
      filename: string;
      modified: string;
      modifiedMs: number;
      size: number;
    }>
  > {
    const files = (await fs.promises
      .readdir(receivedUpgradesRoot, {
        withFileTypes: true
      })
      .then(files => {
        return Promise.all(
          files
            .filter(({ name }) => name.indexOf('.zip') !== -1)
            .map(zipFile => {
              return fs.promises
                .stat(path.join(receivedUpgradesRoot, zipFile.name))
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

    return Promise.resolve(files);
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
