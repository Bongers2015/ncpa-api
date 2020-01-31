import { AuthorizationScope, CardRegistrationStatus } from './shared-types';

export * from './shared-types';

export interface Card {
  /** RFID  */
  token: string;
  status: 'ACCEPTED' | 'BLOCKED' | 'EXPIRED' | 'INVALID' | 'UNKNOWN';
  expirationDate?: string;
}

export interface CardRegistration {
  card?: Card;
  status: CardRegistrationStatus;
  statusMessage: string;
}

export interface CardRegistrationResponse {
  status: CardRegistrationStatus;
  statusMessage: string;
}

export interface ChargingTransaction {
  startedAt: string;
  //   stoppedAt: ISODate;
  duration: Seconds;
  WattHourCharged: CPWattHourCharged;
  cardId: string;
}

// >>> /transactions
export interface Transaction {
  id: string;
  remoteId?: string;
  /** card token id */
  token: string;
  /**
   * @isLong longValue
   */
  startDate: number; // long
  /**
   * @isLong longValue
   */
  stopDate?: number; // long
  stopReason?: string;
  /**
   * @isLong longValue
   */
  startWattHour: number; // long
  /**
   * @isLong longValue
   */
  stopWattHour?: number; // long
  /**
   * @isLong longValue
   */
  consumedWattHours: number; // long
}

export interface ChargingTransactionPerCard {
  startDate: string;
  endDate: string;
  //   stoppedAt: ISODate;
  totalDuration: Seconds;
  totalWattHourCharged: CPWattHourCharged;
  cardId: string;
}

export interface ChargePointStatusUpdate {
  plugAndChargeEnabled: boolean;
}
export type ISODate = string;
export type Seconds = number;
export type CPWattHourCharged = number;
export interface CreateCardRequest {
  token: string;
}
export interface GetAuthQrResponse {
  /** {protocol}://{host}:{port}/{path} */
  host: string;
  /** QR bitmap encoded as data url */
  qrDataUrl: string;
  /** authorization request url */
  requestUrl: string;
  /** url encoded encrypted jwt token */
  encryptedToken: string;
}

/* "ssid": "chargepoint_15e2b0d3c3",
    "psk": "AB/KEb0b3pu3o+K/NB3vbw",
    "qrData": "Base64, encrypted data constaining WiFi, end user Identitytoken, and cp meta data",
    "installerQrData": "Base64, encrypted data containing WiFi, installerToken, and cp meta data"
"identityToken": "JWT token signed with the private cert below",
    "pubCert": "2048 public cert valid from 1970 January 01 until 2040 June 01",
    "privCert"
    */
type GetAuthQrResponse2Roles = {
  [key in AuthorizationScope]: {
    identityToken: string;
    qrData: string;
    requestUrl: string;
    encodedEncryptedQRPayload: string;
    encodedIdentityToken: string;
  };
};
type QRGeneratorRequestRoles = {
  [key in AuthorizationScope]: {
    identityToken: string;
    qrData: string;
    encodedEncryptedQRPayload: string;
  };
};
export interface GetAuthQrResponse2 {
  /** {protocol}://{host}:{port}/{path} */
  host: string;
  ssid: string;
  psk: string;
  roles: GetAuthQrResponse2Roles;
  pubCert: string;
  privCert: string;
}
export interface QRGeneratorRequest {
  chargePointId: string;
  ssid: string;
  psk: string;
  privCert: string;
  sharedSecret: string;
}
export interface QRGeneratorResponse {
  ssid: string;
  psk: string;
  roles: QRGeneratorRequestRoles;
}

export interface Upgrade {
  /** Name of the file on the user's computer */
  originalname: string;
  /** Encoding type of the file */
  encoding: string;
  /** Mime type of the file */
  mimetype: string;
  /** Size of the file in bytes */
  /**
   * @isLong longValue
   */
  size: number;
  /** The folder to which the file has been saved (DiskStorage) */
  destination: string;
  /** The url where to get the uploaded file (aws S3 for example) */
  location: string;
  /** The name of the file within the destination (DiskStorage) */
  filename: string;
  /** Location of the uploaded file (DiskStorage) */
  path: string;
}

export interface UpgradeResponse {
  filename: string;
  data: Upgrade;
}
