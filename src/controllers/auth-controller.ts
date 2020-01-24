import fs from 'fs';
import path from 'path';

import jwt from 'jsonwebtoken';
import { Controller, Get, Route, Tags, Query } from 'tsoa';

import { QRPayload } from 'src/types';

import { decrypt2, encrypt } from '../services/qr';
import { CHARGE_POINT_ID } from '../constants';
@Route('auth')
@Tags('public')
export class AuthController extends Controller {
  /** 
   * expects token as url encoded ciphered jwt token like so:
```js
  const payload =
{
  "iss": "TNM Auth server",
  "sub": "{cp-uuid}",
  "aud": "operator" | "installer",
  "iat": {unix time}},
  "wifi": {
    "ssid": "my-ssid",
    "password": "strong-wifi-password",
    "type": "wpa2",
    "hidden": true
  };

  const jwtToken = jwt.sign(payload, privateKey, {
    algorithm: 'RS256'
  });

  const token = encodeURIComponent(encrypt(jwtToken));
  

```
returns an access token and its accompanying public key for signature validation

```json
{
  accessToken: "eyJhbGciOiJSUzI1NiI...",
  publicKey: "-----BEGIN CERTIFI..."
}
```
   *
   */

  @Get()
  public async validateAuthToken(
    @Query() token: string,
    @Query() clientId?: string
  ): Promise<{ accessToken: string }> {
    return new Promise((resolve, reject) => {
      const serverCert = fs.readFileSync(
        path.resolve(process.cwd(), './certs/server.crt')
      );

      const qrPayload = decrypt2(decodeURIComponent(token)) as unknown;
      const p = qrPayload as QRPayload;

      const { tok: jwtToken, cp: chargePointId } = p;
      if (jwtToken) {
        jwt.verify(jwtToken, serverCert, (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            const { role, iat } = decoded as {
              role: string;
              iat: number;
            };
            if (
              !!iat &&
              !!role &&
              (role === 'operator' || role === 'installer') &&
              !!chargePointId
            ) {
              // select scope
              const privateKey = fs.readFileSync(
                path.resolve(process.cwd(), './certs/server.key')
              );
              const payload = {
                role,
                sub: clientId
              };
              const appToken = jwt.sign(payload, privateKey, {
                algorithm: 'RS256'
              });
              resolve({
                accessToken: encodeURIComponent(appToken)
              });
            } else {
              reject(new Error('no'));
            }
          }
        });
      }
    });
  }
}
