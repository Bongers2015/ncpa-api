import fs from 'fs';
import path from 'path';

import Express from 'express';

import {
  Controller,
  Get,
  Request,
  Security,
  Post,
  Route,
  Tags,
  Body,
  SuccessResponse,
  Example,
  Query
} from 'tsoa';

import qrcode from 'qrcode';

import jwt from 'jsonwebtoken';

import multer from 'multer';

import {
  CardRegistration,
  CreateCardRequest,
  GetAuthQrResponse,
  GetAuthQrResponse2,
  AuthorizationScope,
  QRGeneratorRequest,
  QRGeneratorResponse,
  ExpandedAuthorizationScope
} from '../types';

import cpService from '../services/cp';
import { encrypt, createIdToken } from '../services/qr';

@Route('development')
@Tags('developer')
export class AdminController extends Controller {
  /** jwt scopes: `developer`
   *
   * Developer endpoint for whitelisting card manually
   */
  @Post('/whitelist/cards')
  @Security('jwtAuth')
  public async addCard(
    @Body() createCardRequest: CreateCardRequest
  ): Promise<boolean> {
    return new Promise(resolve => {
      const success = cpService.addCardById(createCardRequest.token);
      if (!success) {
        this.setStatus(405);
      }

      resolve(success);
    });
  }

  /** jwt scopes: `developer`
   *
   * Set the response of the `/card` endpoint request
   */
  @Post('/card/registration-response')
  @Security('jwtAuth')
  public updateCardRegistrationResponse(
    @Body() cardRegistrationResponse: CardRegistration
  ): void {
    cpService.setCardRegistrationResponse(cardRegistrationResponse);
    /* eslint-disable-next-line */
    console.log('cardRegistrationResponse', cardRegistrationResponse);
  }

  /** jwt scopes: `developer` 
   * 
   * Creates a QR code containing an identity token
   * 
   * 
   * ```
   * {
  "iss": "TNM Auth server",
  "sub": "{cp-uuid}",
  "aud": "operator" | "installer",
  "iat": 1516239022,
  "wifi": {
    "ssid": "my-ssid",
    "password": "strong-wifi-password",
    "type": "wpa2",
    "hidden": true
  }
}
```
  */
  // @Get('qr/{host}')
  // @SuccessResponse('200', 'Returns GetAuthQrResponse')
  // @Example<GetAuthQrResponse>({
  //   host: 'https://localhost:3000/api/tnm/freeapp/v1',
  //   requestUrl:
  //     'https://localhost:3000/api/tnm/freeapp/v1/auth?token=U2FsdGVkX19UjqHxvsfJ%2BSvaean7RNS40GIBGdRGsNOT%2BW7lMzLKoz1A%2BPNumYC%2Fr6wXOyXRgz2p1P0CWSwH0p2NOXywE%2FcxRAbqnt0oLUf8KC5PL1%2FlBWjPwUwYNqvFJUTK82bbXO2Vf9VFzaUw12oUT1eTPoPgcuOcFzF8x%2FdptaCB1AtPp5uDd6LAqFRG51QlIwRDtxahDK95Fj%2FdC9ccnX1Rf3WQeleoBqvrbstWSzZpFiQRk%2BzWzbA36RWRtwiKj%2B%2BJlBUcPDrPIgeifkjL6tBKvdFW1KB0dTqicty%2BUC12BI50FeBtbK1e%2FTofzq%2FOT0FGBGnVk3F0w82wtYtgbtW%2F3kJoGqiuIfHH02%2BA2AwR%2BSgYzME12%2FX0DLVX5i58K3nB13TI5jNYoV6TqQvTeiP6irqukMqpyWcCP1FeXTD72SQvtRqEbNwjTfKSAgCoF%2B%2BA0g%2F800mLGjSBOk5jcZLxsn3PyALzHDVkEaQxShj3wLH1uQcBX630caSH%2Fm6WNQd4X8a2cY06QQk65JJ8ky7BtFq9BaLKmxjVRle%2FHBZlc4ipi3gYv2iczhLvzXxkBUNH6R%2F1%2FWIc9GUhOHPWMtmQE7QmHI0KQq%2B%2FeQRTVMjoA4Va6d91b4epGszQViKdyRInT47a8cRHMqJSBC%2FJ2wMOURluRy%2BXSQMPsfwncOPie2swMMWLrfPSEtAKmYs4asTdu%2FusX9v9FryyztmGosnAZzgL7wgUjrGVIOjvX3DN33%2F4KIE4Tl5C3JrdfdLf4ZhlGTo0ElDdP%2BUsCx%2B1eoytP54Nj%2BOHs8ccTR0%3D',
  //   qrDataUrl:
  //     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdQAAAHUCAYAAACDJ9lsAAAbZElEQVR4AezBQY4cupLAQLLQ978yx8tcCRBUbb8/yAj7g7XWWms9+bDWWmutZx/WWmut9ezDWmuttZ59WGuttdazD2uttdZ69mGttdZazz6stdZa69mHtdZaaz37sNZaa61nH9Zaa6317MNaa621nn1Ya6211rMPa6211nr2Ya211lrPPqy11lrr2Q+PVP6mihsqJxUnKlPFpHKj4obKVDGp3Kg4UTmpOFGZKiaVqWJSmSomlaniN6l8U8WkMlVMKlPFicpUMancqJhUpooTlaniROVFxaQyVdxQmSpuqEwVL1ReVEwqJxU3VKaKE5WpYlL5mypefFhrrbXWsw9rrbXWevZhrbXWWs9++LKKb1K5oTJVnKhMFVPFjYobKlPFicqNihOVqeKGylTxmyomlRcVJxWTylQxqUwVk8qJyouKk4oTlZOKSWWqOFGZKqaKE5Wp4qRiUvkmlaliqphUpopJZar4JpUXKlPFVDGpTBUvKr5J5Zs+rLXWWuvZh7XWWms9+7DWWmutZz/8MpUbFTdUvknlpGKquKEyVbyouKEyVdxQOVE5qbihMlVMFTdUbqicqNyouKEyqUwVk8pUMal8U8WkMlVMKicqU8WJyouKGypTxYnKicqLit+kcqIyVZyofJPKjYrf9GGttdZazz6stdZa69mHtdZaaz374f+ZihOVGxUnKjcqblR8U8WkclIxVUwqU8Wk8k0qLypuVJyoTBUvVE4qJpX/MpWp4m+qmFQmlaliUjlROamYVG6oTBWTylRxovKi4kTlRsX/Jx/WWmut9ezDWmuttZ59WGuttdazH9aRyknFDZWp4obKScWkMlXcUHlR8TdVTConKlPFpDJVTBU3VF6o3FB5oXKj4kTlpOKk4kRlUrmh8k0qJxWTyonKVHGj4kRlqjhRmSomlROVqeJ/2Ye11lprPfuw1lprrWcf1lprrfXsh19W8Tep3KiYVL5J5X9JxQ2VE5WpYlL5JpUTlROVqeJE5aTiRsUNlZOKSWWqeKEyqZxU/E0VJypTxQ2VqeKGyknFicqNikllqnihMlVMKlPFi4r/kg9rrbXWevZhrbXWWs8+rLXWWuvZD1...',
  //   encryptedToken:
  //     'U2FsdGVkX19UjqHxvsfJ%2BSvaean7RNS40GIBGdRGsNOT%2BW7lMzLKoz1A%2BPNumYC%2Fr6wXOyXRgz2p1P0CWSwH0p2NOXywE%2FcxRAbqnt0oLUf8KC5PL1%2FlBWjPwUwYNqvFJUTK82bbXO2Vf9VFzaUw12oUT1eTPoPgcuOcFzF8x%2FdptaCB1AtPp5uDd6LAqFRG51QlIwRDtxahDK95Fj%2FdC9ccnX1Rf3WQeleoBqvrbstWSzZpFiQRk%2BzWzbA36RWRtwiKj%2B%2BJlBUcPDrPIgeifkjL6tBKvdFW1KB0dTqicty%2BUC12BI50FeBtbK1e%2FTofzq%2FOT0FGBGnVk3F0w82wtYtgbtW%2F3kJoGqiuIfHH02%2BA2AwR%2BSgYzME12%2FX0DLVX5i58K3nB13TI5jNYoV6TqQvTeiP6irqukMqpyWcCP1FeXTD72SQvtRqEbNwjTfKSAgCoF%2B%2BA0g%2F800mLGjSBOk5jcZLxsn3PyALzHDVkEaQxShj3wLH1uQcBX630caSH%2Fm6WNQd4X8a2cY06QQk65JJ8ky7BtFq9BaLKmxjVRle%2FHBZlc4ipi3gYv2iczhLvzXxkBUNH6R%2F1%2FWIc9GUhOHPWMtmQE7QmHI0KQq%2B%2FeQRTVMjoA4Va6d91b4epGszQViKdyRInT47a8cRHMqJSBC%2FJ2wMOURluRy%2BXSQMPsfwncOPie2swMMWLrfPSEtAKmYs4asTdu%2FusX9v9FryyztmGosnAZzgL7wgUjrGVIOjvX3DN33%2F4KIE4Tl5C3JrdfdLf4ZhlGTo0ElDdP%2BUsCx%2B1eoytP54Nj%2BOHs8ccTR0%3D'
  // })
  // public async getAuthQr(
  //   host = 'http://asdasd',
  //   /** valid chargePointId for this application would be `12345` */
  //   @Query() chargePointId: string,
  //   @Query() clientId: string,
  //   @Query() scope: AuthorizationScope
  // ): Promise<GetAuthQrResponse> {
  //   const privateKey = fs.readFileSync(
  //     path.resolve(process.cwd(), './certs/server.key')
  //   );

  //   const payload = {
  //     iss: 'TNM Auth Server',
  //     sub: `${chargePointId}`,
  //     aud: scope,
  //     wifi: {
  //       ssid: 'my-ssid',
  //       password: 'strong-wifi-password',
  //       type: 'wpa2',
  //       hidden: true
  //     }
  //   };
  //   const token = jwt.sign(payload, privateKey, {
  //     algorithm: 'RS256'
  //   });

  //   const encryptedToken = encrypt(token);
  //   const encodedEncryptedToken = encodeURIComponent(encrypt(token));

  //   return new Promise((resolve, reject) => {
  //     const requestUrl = `${host}/auth?clientId=${clientId}&token=${encodedEncryptedToken}`;
  //     qrcode.toDataURL(encryptedToken, (err, qrDataUrl) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         this.setStatus(201);
  //         resolve({
  //           host,
  //           requestUrl,
  //           qrDataUrl,
  //           encryptedToken: encodedEncryptedToken
  //         });
  //       }
  //     });
  //   });
  // }

  @Post('qr-gen')
  @SuccessResponse('200', 'Returns QRGeneratorResponse')
  @Example<QRGeneratorResponse>({
    ssid: 'chargepoint_15e2b0d3c3',
    psk: 'AB/KEb0b3pu3o+K/NB3vbw',
    roles: {
      operator: {
        identityToken: 'JWT token signed with the private cert below',
        qrData:
          'Base64, encrypted data containing WiFi, installerToken, and cp meta data',
        encodedEncryptedQRPayload:
          'identityToken encoded with encodeURIComponent'
      },
      installer: {
        identityToken: 'JWT token signed with the private cert below',
        qrData:
          'Base64, encrypted data containing WiFi, installerToken, and cp meta data',
        encodedEncryptedQRPayload:
          'identityToken encoded with encodeURIComponent'
      }
    }
  })
  public async qrGenerator(
    @Request() request: Express.Request,
    @Query() chargePointId: string,
    @Query() ssid: string,
    @Query() psk: string,
    @Query() sharedSecret?: string
  ): Promise<QRGeneratorResponse> {
    const privCert = await this.handleFile(request);
    const operatorStuff = await createIdToken({
      chargePointId,
      role: 'operator',
      ssid,
      psk,
      privCert,
      sharedSecret
    });
    const installerStuff = await createIdToken({
      chargePointId,
      role: 'installer',
      ssid,
      psk,
      privCert,
      sharedSecret
    });

    return Promise.resolve({
      ssid,
      psk,
      roles: {
        operator: {
          identityToken: operatorStuff.identityToken,
          qrData: operatorStuff.qrData,
          encodedEncryptedQRPayload: operatorStuff.encodedEncryptedQRPayload
        },
        installer: {
          identityToken: installerStuff.identityToken,
          qrData: installerStuff.qrData,
          encodedEncryptedQRPayload: installerStuff.encodedEncryptedQRPayload
        }
      }
    });
  }

  // @Get('qr2/{host}')
  // @SuccessResponse('200', 'Returns GetAuthQrResponse2')
  // @Example<GetAuthQrResponse2>({
  //   host: 'https://localhost:3000/api/tnm/freeapp/v1',
  //   ssid: 'chargepoint_15e2b0d3c3',
  //   psk: 'AB/KEb0b3pu3o+K/NB3vbw',
  //   roles: {
  //     operator: {
  //       requestUrl:
  //         'https://localhost:3000/api/tnm/freeapp/v1/auth?token=U2FsdGVkX19UjqHxvsfJ%2BSvaean7RNS40GIBGdRGsNOT%2BW7lMzLKoz1A%2BPNumYC%2Fr6wXOyXRgz2p1P0CWSwH0p2NOXywE%2FcxRAbqnt0oLUf8KC5PL1%2FlBWjPwUwYNqvFJUTK82bbXO2Vf9VFzaUw12oUT1eTPoPgcuOcFzF8x%2FdptaCB1AtPp5uDd6LAqFRG51QlIwRDtxahDK95Fj%2FdC9ccnX1Rf3WQeleoBqvrbstWSzZpFiQRk%2BzWzbA36RWRtwiKj%2B%2BJlBUcPDrPIgeifkjL6tBKvdFW1KB0dTqicty%2BUC12BI50FeBtbK1e%2FTofzq%2FOT0FGBGnVk3F0w82wtYtgbtW%2F3kJoGqiuIfHH02%2BA2AwR%2BSgYzME12%2FX0DLVX5i58K3nB13TI5jNYoV6TqQvTeiP6irqukMqpyWcCP1FeXTD72SQvtRqEbNwjTfKSAgCoF%2B%2BA0g%2F800mLGjSBOk5jcZLxsn3PyALzHDVkEaQxShj3wLH1uQcBX630caSH%2Fm6WNQd4X8a2cY06QQk65JJ8ky7BtFq9BaLKmxjVRle%2FHBZlc4ipi3gYv2iczhLvzXxkBUNH6R%2F1%2FWIc9GUhOHPWMtmQE7QmHI0KQq%2B%2FeQRTVMjoA4Va6d91b4epGszQViKdyRInT47a8cRHMqJSBC%2FJ2wMOURluRy%2BXSQMPsfwncOPie2swMMWLrfPSEtAKmYs4asTdu%2FusX9v9FryyztmGosnAZzgL7wgUjrGVIOjvX3DN33%2F4KIE4Tl5C3JrdfdLf4ZhlGTo0ElDdP%2BUsCx%2B1eoytP54Nj%2BOHs8ccTR0%3D',

  //       identityToken: 'JWT token signed with the private cert below',
  //       qrData:
  //         'Base64, encrypted data containing WiFi, installerToken, and cp meta data',
  //       encodedEncryptedQRPayload: 'encodedEncryptedQRPayload',
  //       encodedIdentityToken: 'encodedIdentityToken'
  //     },
  //     installer: {
  //       requestUrl:
  //         'https://localhost:3000/api/tnm/freeapp/v1/auth?token=U2FsdGVkX19UjqHxvsfJ%2BSvaean7RNS40GIBGdRGsNOT%2BW7lMzLKoz1A%2BPNumYC%2Fr6wXOyXRgz2p1P0CWSwH0p2NOXywE%2FcxRAbqnt0oLUf8KC5PL1%2FlBWjPwUwYNqvFJUTK82bbXO2Vf9VFzaUw12oUT1eTPoPgcuOcFzF8x%2FdptaCB1AtPp5uDd6LAqFRG51QlIwRDtxahDK95Fj%2FdC9ccnX1Rf3WQeleoBqvrbstWSzZpFiQRk%2BzWzbA36RWRtwiKj%2B%2BJlBUcPDrPIgeifkjL6tBKvdFW1KB0dTqicty%2BUC12BI50FeBtbK1e%2FTofzq%2FOT0FGBGnVk3F0w82wtYtgbtW%2F3kJoGqiuIfHH02%2BA2AwR%2BSgYzME12%2FX0DLVX5i58K3nB13TI5jNYoV6TqQvTeiP6irqukMqpyWcCP1FeXTD72SQvtRqEbNwjTfKSAgCoF%2B%2BA0g%2F800mLGjSBOk5jcZLxsn3PyALzHDVkEaQxShj3wLH1uQcBX630caSH%2Fm6WNQd4X8a2cY06QQk65JJ8ky7BtFq9BaLKmxjVRle%2FHBZlc4ipi3gYv2iczhLvzXxkBUNH6R%2F1%2FWIc9GUhOHPWMtmQE7QmHI0KQq%2B%2FeQRTVMjoA4Va6d91b4epGszQViKdyRInT47a8cRHMqJSBC%2FJ2wMOURluRy%2BXSQMPsfwncOPie2swMMWLrfPSEtAKmYs4asTdu%2FusX9v9FryyztmGosnAZzgL7wgUjrGVIOjvX3DN33%2F4KIE4Tl5C3JrdfdLf4ZhlGTo0ElDdP%2BUsCx%2B1eoytP54Nj%2BOHs8ccTR0%3D',

  //       identityToken: 'JWT token signed with the private cert below',
  //       qrData:
  //         'Base64, encrypted data containing WiFi, installerToken, and cp meta data',
  //       encodedEncryptedQRPayload: 'encodedEncryptedQRPayload',
  //       encodedIdentityToken: 'encodedIdentityToken'
  //     }
  //   },
  //   pubCert: '2048 public cert valid from 1970 January 01 until 2040 June 01',
  //   privCert: '2048 public cert valid from 1970 January 01 until 2040 June 01'
  // })
  // public async getAuthQr2(
  //   host: string,
  //   /** valid chargePointId for this application would be `12345` */
  //   @Query() chargePointId: string,
  //   @Query() clientId: string,
  //   @Query() ssid: string,
  //   @Query() psk: string
  // ): Promise<GetAuthQrResponse2> {
  //   const operatorStuff = await createIdToken({
  //     chargePointId,
  //     role: 'operator',
  //     ssid,
  //     psk
  //   });
  //   const installerStuff = await createIdToken({
  //     chargePointId,
  //     role: 'installer',
  //     ssid,
  //     psk
  //   });

  //   return Promise.resolve({
  //     host,
  //     ssid,
  //     psk,
  //     roles: {
  //       operator: {
  //         requestUrl: `${host}/auth?clientId=${clientId}&token=${operatorStuff.encodedIdentityToken}`,
  //         identityToken: operatorStuff.identityToken,
  //         encodedIdentityToken: operatorStuff.encodedIdentityToken,
  //         qrData: operatorStuff.qrData,
  //         encodedEncryptedQRPayload: operatorStuff.encodedEncryptedQRPayload
  //       },
  //       installer: {
  //         requestUrl: `${host}/auth?clientId=${clientId}&token=${installerStuff.encodedIdentityToken}`,
  //         identityToken: installerStuff.identityToken,
  //         encodedIdentityToken: installerStuff.encodedIdentityToken,
  //         qrData: installerStuff.qrData,
  //         encodedEncryptedQRPayload: installerStuff.encodedEncryptedQRPayload
  //       }
  //     },
  //     pubCert: 'pubCert',
  //     privCert: 'privCert'
  //   });
  // }

  private handleFile(request: Express.Request): Promise<string> {
    const multerSingle = multer().single('privCert');
    return new Promise((resolve, reject) => {
      multerSingle(request, undefined, async error => {
        if (error) {
          reject(error);
        }
        if (request.file) {
          resolve(request.file.buffer.toString('utf8'));
        } else {
          resolve();
        }
      });
    });
  }
}
