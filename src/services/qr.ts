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

import { QRPayload, AuthorizationScope, IDTokenPayload } from '../types';

export const encrypt = (message: string): string => {
  return CryptoJS.AES.encrypt(message, QR_SECRET).toString();
};

export const decrypt = (ciphertext: string): string => {
  return CryptoJS.AES.decrypt(ciphertext, QR_SECRET).toString(
    CryptoJS.enc.Utf8
  );
};

export const encrypt2 = (
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

export const decrypt2 = (
  messageWithNonce: string,
  key: string = QR_SHARED_SECRET
): JSON => {
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
  idTokenPayload: IDTokenPayload;
  idToken: string;
  qrPayload: QRPayload;
  encryptedQRPayload: string;
  encodedEncryptedQRPayload: string;
  qrData: string;
};
export const createIdToken = async ({
  chargePointId,
  role: scope,
  ssid,
  psk
}: {
  chargePointId: string;
  role: AuthorizationScope;
  ssid: string;
  psk: string;
}): Promise<CreatedIdToken> => {
  const privateKey = fs.readFileSync(
    path.resolve(process.cwd(), './certs/server.key')
  );

  const idTokenPayload: IDTokenPayload = {
    role: scope
  };

  const idToken = jwt.sign(idTokenPayload, privateKey, {
    algorithm: 'RS256'
  });
  const qrPayload: QRPayload = {
    SSID: ssid,
    Password: psk,
    Encryption: 'WPA2',
    tok: idToken,
    cp: chargePointId
  };

  const encryptedQRPayload = encrypt2(qrPayload);
  const encodedEncryptedQRPayload = encodeURIComponent(encrypt2(qrPayload));
  return new Promise((resolve, reject) => {
    // const requestUrl = `${host}/auth?clientId=${clientId}&token=${encodedEncryptedToken}`;
    qrcode.toDataURL(encryptedQRPayload, (err, qrDataUrl) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          idTokenPayload,
          idToken,
          qrPayload,
          encryptedQRPayload,
          encodedEncryptedQRPayload,
          qrData: qrDataUrl
        });
      }
    });
  });
};
