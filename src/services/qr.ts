import CryptoJS from 'crypto-js';

const QR_SECRET = 'SUPER_MAGIC_SECRET';

export const encrypt = (message: string): string => {
  return CryptoJS.AES.encrypt(message, QR_SECRET).toString();
};

export const decrypt = (ciphertext: string): string => {
  return CryptoJS.AES.decrypt(ciphertext, QR_SECRET).toString(
    CryptoJS.enc.Utf8
  );
};
