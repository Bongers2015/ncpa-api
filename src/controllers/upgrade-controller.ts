import fs from 'fs';
import path from 'path';

import { Controller, Post, Request, Route, Security, Tags, Query } from 'tsoa';
import Express from 'express';
import multer from 'multer';

import cpService from '../services/cp';

import { Upgrade } from '../types';

const fsPromises = fs.promises;

@Route('upgrade')
@Tags('operator')
@Security('jwtAuth', ['operator', 'installer'])
export class UpgradeController extends Controller {
  /** jwt scopes: `operator` */
  @Post()
  public async upgrade(
    @Request() request: Express.Request,
    @Query() clientId: string
  ): Promise<Upgrade> {
    cpService.checkClientId(clientId);
    const upgradeResponse = await this.handleFile(request);
    return upgradeResponse;
  }

  private handleFile(request: Express.Request): Promise<Upgrade> {
    console.log('request.body', request.body);
    console.log(multer().any());

    multer().any()(request, undefined, error => {
      console.log('request error', error);
      console.log('request', request.files);
    });
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

        fsPromises.writeFile(
          path.join(process.cwd(), 'received-upgrades', originalname),
          request.file.buffer
        );

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
