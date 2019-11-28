import { Controller, Post, Request, Route, Security, Tags } from 'tsoa';
import Express from 'express';
import multer from 'multer';

import { Upgrade, UpgradeResponse } from '../types';

@Route('upgrade')
@Tags('installer')
@Security('jwtAuth')
export class UpgradeController extends Controller {
  /** jwt scopes: `installer` */
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
