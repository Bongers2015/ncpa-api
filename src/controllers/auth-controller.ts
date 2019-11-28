import fs from 'fs';
import path from 'path';

import jwt from 'jsonwebtoken';
import { Controller, Get, Route, Tags, Query } from 'tsoa';

import { decrypt } from '../services/qr';
@Route('auth')
@Tags('Charge point')
export class AuthController extends Controller {
  /** 
    
    
    jwt scopes:
   * expects the following
```json
{
      scope: ['operator'],
      sub: '{mobile client id}'
}
```
   *
   */

  @Get()
  public async validateAuthToken(@Query() token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const serverCert = fs.readFileSync(
        path.resolve(process.cwd(), './certs/server.crt')
      );
      const jwtToken = decrypt(decodeURIComponent(token));

      jwt.verify(jwtToken, serverCert, err => {
        if (err) {
          reject(err);
        } else {
          const privateKey = fs.readFileSync(
            path.resolve(process.cwd(), './certs/server.key')
          );
          const payload = {
            scope: 'operator'
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
