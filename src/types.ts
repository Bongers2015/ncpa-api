export type CardRegistrationStatus = 'SUCCESS' | 'FAILURE' | 'TIMEOUT';
export type CardId = string;
export type CardOwner = string;

export interface Card {
  /** RFID  */
  token: string;
  status: 'ACCEPTED' | 'BLOCKED' | 'EXPIRED' | 'INVALID';
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

export type AuthMode = 'PLUGNCHARGE' | 'WHITELIST';
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
  /** card token id */
  token: string;
  startDate: string;
  stopDate?: string;
  stopReason?: string;
  startKWattHour: number;
  stopKWattHour?: number;
}

export interface ChargingTransactionPerCard {
  startDate: string;
  endDate: string;
  //   stoppedAt: ISODate;
  totalDuration: Seconds;
  totalWattHourCharged: CPWattHourCharged;
  cardId: string;
}
export type ChargePointStatuCode = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type ChargePointStatusMessage =
  | 'Available'
  | 'Preparing'
  | 'Charging'
  | 'SuspendedEV'
  | 'SuspendedEVSE'
  | 'Finishing'
  | 'Faulted';

// export type ChargePointStatuCode = ChargePointStatus['code'];

// export type ChargePointStatus = (
//   | { code: 0; statusMessage: 'Available' }
//   | { code: 1; statusMessage: 'Preparing' }
//   | { code: 2; statusMessage: 'Charging' }
//   | { code: 3; statusMessage: 'SuspendedEV' }
//   | { code: 4; statusMessage: 'SuspendedEVSE' }
//   | { code: 5; statusMessage: 'Finishing' }
//   | { code: 6; statusMessage: 'Faulted' }) & {
//   plugAndChargeEnabled: boolean;
//   numberOfRFIDCardsRegistered: number;
// };

export interface ChargePointStatus {
  code: ChargePointStatuCode;
  statusMessage: ChargePointStatusMessage;
  plugAndChargeEnabled: boolean;
  numberOfRFIDCardsRegistered: number;
}

// export type ChargePointStatusMessage = ChargePointStatus['statusMessage'];
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
}
export type SocketLockMode = 'TRANSACTION' | 'LOCKED' | 'UNLOCKED';

export interface Upgrade {
  /** Name of the file on the user's computer */
  originalname: string;
  /** Encoding type of the file */
  encoding: string;
  /** Mime type of the file */
  mimetype: string;
  /** Size of the file in bytes */
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
