import fs from 'fs';
import path from 'path';

import jwt from 'jsonwebtoken';
import { Controller, Get, Route, Tags, Query } from 'tsoa';

import { QRPayload } from 'src/types';

import {
  ExpandedAuthorizationScope,
  AuthorizationScope
} from 'src/shared-types';

import { decrypt2 } from '../services/qr';

// import { CHARGE_POINT_ID } from '../constants';
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
  accessToken: "eyJhbGciOiJSUzI1NiI..."
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

      const jwtToken = decodeURIComponent(token);
      console.log('token', token);
      console.log('jwtToken', jwtToken);

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
              (role === 'identity_operator' || role === 'identity_installer')
            ) {
              const lookupHell: {
                [key in ExpandedAuthorizationScope]: AuthorizationScope;
              } = {
                // eslint-disable-next-line @typescript-eslint/camelcase
                identity_installer: 'installer',
                // eslint-disable-next-line @typescript-eslint/camelcase
                identity_operator: 'operator'
              };

              const implodedRole = lookupHell[role];
              // select scope
              const privateKey = fs.readFileSync(
                path.resolve(process.cwd(), './certs/server.key')
              );
              const payload = {
                role: implodedRole,
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
      } else {
        reject(new Error('erm no'));
      }
    });
  }
}
