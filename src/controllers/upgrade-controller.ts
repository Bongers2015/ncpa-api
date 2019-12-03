import { Controller, Post, Request, Route, Security, Tags } from 'tsoa';
import Express from 'express';
import multer from 'multer';

import { Upgrade } from '../types';

@Route('upgrade')
@Tags('installer')
@Security('jwtAuth')
export class UpgradeController extends Controller {
  /** jwt scopes: `installer` */
  @Post()
  public async upgrade(@Request() request: Express.Request): Promise<Upgrade> {
    const upgradeResponse = await this.handleFile(request);
    return upgradeResponse;
  }

  private handleFile(request: Express.Request): Promise<Upgrade> {
    const multerSingle = multer().single('data');
    return new Promise((resolve, reject) => {
      multerSingle(request, undefined, async error => {
        const file: Upgrade = request.file;

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
          filename,
          path: uploadPath
        } = file;

        resolve({
          originalname,
          encoding,
          mimetype,
          size,
          destination,
          location,
          filename,
          path: uploadPath
        });
      });
    });
  }
}
