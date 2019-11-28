import fs from 'fs';
import path from 'path';

import jwt from 'jsonwebtoken';
import { Controller, Get, Route, Tags, Query } from 'tsoa';

import { decrypt } from '../services/qr';
import { CHARGE_POINT_ID } from '../constants';
@Route('auth')
@Tags('operator')
export class AuthController extends Controller {
  /** 
   * expects token as url encoded cyphered jwt token like so:
```json
{
  "iss": "TNM Auth server",
  "sub": "{cp-uuid}",
  "aud": ["operator" | "installer", "{client-id}"],
  "iat": {unix time}},
  "wifi": {
    "ssid": "my-ssid",
    "password": "strong-wifi-password",
    "type": "wpa2",
    "hidden": true
  }
```
returns an access token:

```json
{
  "iss": "{cp-uuid}",
  "sub": "{cp-uuid}",
  "aud": "{client-uuid}",
  "iat": 1516239022,
  "scopes": ["operator" | "installer"]
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

      jwt.verify(jwtToken, serverCert, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          const { iss, sub: chargePointId, aud } = decoded;

          if (
            iss === 'TNM Auth Server' &&
            aud &&
            chargePointId === CHARGE_POINT_ID
          ) {
            // select scope
            if (!Array.isArray(aud) || aud.length !== 2) {
              reject(new Error('aud is bad'));
            } else {
              const [scope, clientId] = aud;
              if (scope !== 'installer' || scope !== 'operator') {
                reject(new Error('bad scope'));
              } else {
                const privateKey = fs.readFileSync(
                  path.resolve(process.cwd(), './certs/server.key')
                );
                const payload = {
                  scope,
                  iss: chargePointId,
                  sub: chargePointId,
                  aud: clientId
                };
                const appToken = jwt.sign(payload, privateKey, {
                  algorithm: 'RS256'
                });
                resolve(appToken);
              }
            }
          } else {
            reject(new Error('no'));
          }
        }
      });
    });
  }
}
