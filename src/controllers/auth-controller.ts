/* eslint-disable max-classes-per-file */
/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';

import jwt from 'jsonwebtoken';
import {
  Controller,
  Get,
  Route,
  Tags
  // SuccessResponse
} from 'tsoa';

@Route('auth')
@Tags('Charge point')
export class AuthController extends Controller {
  @Get('{jwtToken}')
  public async validateAuthToken(jwtToken: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const serverCert = fs.readFileSync(
        path.resolve(process.cwd(), './certs/server.crt')
      );

      jwt.verify(jwtToken, serverCert, err => {
        if (err) {
          reject(err);
        } else {
          const privateKey = fs.readFileSync(
            path.resolve(process.cwd(), './certs/server.key')
          );
          const payload = {
            claims: {
              rudi: 'mag alles'
            }
          };
          const appToken = jwt.sign(payload, privateKey, {
            algorithm: 'RS256'
          });
          resolve(appToken);
        }
      });
    });
  }
}
