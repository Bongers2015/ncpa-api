import { Controller, Post, Request, Route, Security, Tags } from 'tsoa';
import Express from 'express';
import multer from 'multer';

// import cpService from '../services/cp';
export interface Upgrade {
  /** Name of the file on the user's computer */
  originalname: string;
  /** Encoding type of the file */
  encoding: string;
  /** Mime type of the file */
  mimetype: string;
  /** Size of the file in bytes */
  size: number;
  /** The folder to which the file has been saved (DiskStorage) */
  destination: string;
  /** The url where to get the uploaded file (aws S3 for example) */
  location: string;
  /** The name of the file within the destination (DiskStorage) */
  filename: string;
  /** Location of the uploaded file (DiskStorage) */
  path: string;
}

export interface UpgradeResponse {
  filename: string;
  data: Upgrade;
}
@Route('upgrade')
@Tags('Charge point')
@Security('jwtAuth')
export class UpgradeController extends Controller {
  @Post()
  public async upgrade(
    @Request() request: Express.Request
  ): Promise<UpgradeResponse> {
    const upgradeResponse = await this.handleFile(request);
    return upgradeResponse;
  }

  private handleFile(request: Express.Request): Promise<UpgradeResponse> {
    const multerSingle = multer().single('data');
    return new Promise((resolve, reject) => {
      multerSingle(request, undefined, async error => {
        const file: Upgrade = request.file;
        const { filename } = request.body;

        if (error) {
          reject(error);
        }
        const {
          originalname,
          encoding,
          mimetype,
          size,
          destination,
          location,
          filename: uploadFilename,
          path: uploadPath
        } = file;

        resolve({
          filename,
          data: {
            originalname,
            encoding,
            mimetype,
            size,
            destination,
            location,
            filename: uploadFilename,
            path: uploadPath
          }
        });
      });
    });
  }
}
