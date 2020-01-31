import fs from 'fs';

import path from 'path';

import CryptoJS from 'crypto-js';
import {
  randomBytes,
  decodeUTF8,
  secretbox,
  secretbox_open as secretboxOpen,
  encodeBase64,
  encodeUTF8,
  BoxLength
} from 'tweetnacl-ts';

import qrcode from 'qrcode';

import jwt from 'jsonwebtoken';

import { QR_SECRET, QR_SHARED_SECRET } from '../constants';

import {
  QRPayload,
  AuthorizationScope,
  IDTokenPayload,
  ExpandedAuthorizationScope
} from '../types';

export const encrypt = (message: string): string => {
  return CryptoJS.AES.encrypt(message, QR_SECRET).toString();
};

export const decrypt = (ciphertext: string): string => {
  return CryptoJS.AES.decrypt(ciphertext, QR_SECRET).toString(
    CryptoJS.enc.Utf8
  );
};

export const encryptJSON = (
  json: QRPayload,
  key: string = QR_SHARED_SECRET
): string => {
  const keyUint8Array = Buffer.from(key, 'base64');

  const nonce = randomBytes(BoxLength.Nonce);
  const messageUint8 = decodeUTF8(JSON.stringify(json));

  const box = secretbox(messageUint8, nonce, keyUint8Array);

  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);

  const base64FullMessage = encodeBase64(fullMessage);
  return base64FullMessage;
};

export const decrypt2 = <T = { [key: string]: unknown }>(
  messageWithNonce: string,
  key: string = QR_SHARED_SECRET
): T => {
  const keyUint8Array = Buffer.from(key, 'base64');
  const messageWithNonceAsUint8Array = Buffer.from(messageWithNonce, 'base64');
  const nonce = messageWithNonceAsUint8Array.slice(0, BoxLength.Nonce);
  const message = messageWithNonceAsUint8Array.slice(
    BoxLength.Nonce,
    messageWithNonce.length
  );

  const decrypted = secretboxOpen(message, nonce, keyUint8Array);

  if (!decrypted) {
    throw new Error('Could not decrypt message');
  }

  const base64DecryptedMessage = encodeUTF8(decrypted);
  return JSON.parse(base64DecryptedMessage);
};

type CreatedIdToken = {
  identityTokenPayload: IDTokenPayload;
  identityToken: string;
  encodedIdentityToken: string;
  qrPayload: QRPayload;
  encodedEncryptedQRPayload: string;
  qrData: string;
};
export const createIdToken = async ({
  chargePointId,
  role: scope,
  ssid,
  psk,
  privCert,
  sharedSecret
}: {
  chargePointId: string;
  role: AuthorizationScope;
  ssid: string;
  psk: string;
  privCert?: string;
  sharedSecret?: string;
}): Promise<CreatedIdToken> => {
  const privateKey =
    privCert ||
    fs.readFileSync(path.resolve(process.cwd(), './certs/server.key'));

  const lookup: { [key in AuthorizationScope]: ExpandedAuthorizationScope } = {
    operator: 'identity_operator',
    installer: 'identity_installer'
  };
  const expandedRoleName = lookup[scope];

  const idTokenPayload: IDTokenPayload = {
    role: expandedRoleName
  };

  const idToken = jwt.sign(idTokenPayload, privateKey, {
    algorithm: 'RS256'
  });

  console.log('idToken', idToken);
  console.log('idToken.length', idToken.length);

  const serverCert = fs.readFileSync(
    path.resolve(process.cwd(), './certs/server.crt')
  );

  jwt.verify(idToken, serverCert, (err, decoded) => {
    console.log('err', err);
    console.log('decoded', decoded);
  });

  const qrPayload: QRPayload = {
    SSID: ssid,
    Password: psk,
    Encryption: 'WPA2',
    tok: idToken,
    cp: chargePointId
  };

  const encodedEncryptedQRPayload = encryptJSON(qrPayload, sharedSecret);
  const encodedIdToken = encodeURIComponent(idToken);
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(encodedEncryptedQRPayload, (err, qrDataUrl) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          identityTokenPayload: idTokenPayload,
          identityToken: idToken,
          encodedIdentityToken: encodedIdToken,
          qrPayload,
          encodedEncryptedQRPayload,
          qrData: qrDataUrl
        });
      }
    });
  });
};
