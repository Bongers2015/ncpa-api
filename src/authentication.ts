import fs from 'fs';
import path from 'path';

import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const skipAuth = true;
// eslint-disable-next-line consistent-return
export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<
  { id?: number; name?: string } | { role: string; iat: number; sub: string }
> {
  if (securityName === 'api_key') {
    let token;
    if (request.query && request.query.access_token) {
      token = request.query.access_token;
    }

    if (token === 'abc123456') {
      return Promise.resolve({
        id: 1,
        name: 'Ironman'
      });
    }
    return Promise.reject(new Error('lolnopes'));
  }

  if (securityName === 'jwtAuth') {
    const token =
      // request.body.token ||
      // request.query.token ||
      // request.headers['x-access-token'] ||
      request.headers.authorization;
    if (skipAuth) {
      return Promise.resolve({});
    }
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error('No token provided'));
      } else {
        const bearer = 'Bearer ';
        if (token.indexOf(bearer) !== 0) {
          reject(new Error('No token provided'));
        } else {
          const strippedToken = token.substring(bearer.length);
          const serverCert = fs.readFileSync(
            path.resolve(process.cwd(), './certs/server.crt')
          );

          jwt.verify(strippedToken, serverCert, function secrets(
            err: jwt.VerifyErrors,
            decoded: { role: string; iat: number; sub: string }
          ) {
            console.log(decoded, scopes);
            if (err) {
              reject(err);
            } else if (!scopes.includes(decoded.role)) {
              // Check if JWT contains all required scopes
              // eslint-disable-next-line no-restricted-syntax
              reject(new Error('JWT does not contain required scope.'));
            } else {
              resolve(decoded);
            }
          });
        }
      }
    });
  }
}
