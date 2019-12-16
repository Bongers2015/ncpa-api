import fs from 'fs';
import path from 'path';

import express from 'express';
import { Controller, Get, Request, Route, Tags } from 'tsoa';

@Route('keys')
export class KeysController extends Controller {
  /**
   * return public key for validation id token signature
```
-----BEGIN CERTIFICATE-----
MIIDpDCCAoygAwIBAgIJAL7MzZaZlELpMA0GCSqGSIb3DQEBCwUAMBQxEjAQBgNV
BAMMCWxvY2FsaG9zdDAeFw0xODA5MTcxOTMwNDZaFw0yMDAxMzAxOTMwNDZaMIGs
MQswCQYDVQQGEwJOTDEUMBIGA1UECAwLUmFuZG9tU3RhdGUxEzARBgNVBAcMClJh
bmRvbUNpdHkxGzAZBgNVBAoMElJhbmRvbU9yZ2FuaXphdGlvbjEfMB0GA1UECwwW
```
*/
  @Tags('public')
  @Get()
  public async getIdTokenPublicKey(
    @Request() request: express.Request
  ): Promise<string> {
    return new Promise(resolve => {
      const serverCert = fs.readFileSync(
        path.resolve(process.cwd(), './certs/server.crt')
      );
      const response = request.res as express.Response;
      this.setStatus(200);
      response.contentType('application/text');
      response.send(serverCert.toString()).end();
      resolve(null);
    });
  }
}
