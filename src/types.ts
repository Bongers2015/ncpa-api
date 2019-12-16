export type CardRegistrationStatus = 'SUCCESS' | 'FAILURE' | 'TIMEOUT';
export type CardId = string;
export type CardOwner = string;

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

export type AuthorizationMode = 'PLUGNCHARGE' | 'WHITELIST';
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
export type ChargePointStatus = 'OPERATIVE' | 'INOPERATIVE' | 'FAULTED';
export type TransactionStatus =
  | 'AVAILABLE'
  | 'PREPARING'
  | 'CHARGING'
  | 'SUSPENDED_EV'
  | 'SUSPENDED_EVSE'
  | 'FINISHING'
  | 'FAULTED';
export type ConnectorStatus = 'OPERATIVE' | 'INOPERATIVE' | 'FAULTED';

export interface Status {
  chargePointStatus: ChargePointStatus;
  transactionStatus: TransactionStatus[];
  connectorStatus: ConnectorStatus[];
  authorizationMode: AuthorizationMode;
  /**
   * @isLong longValue
   */
  numberOfRFIDCardsRegistered: number;
}

export interface InstallerStatus {
  onOffPeak: Peak;
  loadSheddingModule: LoadSheddingStatus;
  installationUsage: InstallationUsage;
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
export type SocketLockMode = 'TRANSACTION' | 'LOCKED' | 'UNLOCKED';

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

export type AuthorizationScope = 'operator' | 'installer';
export type LoadShedding = 'NO' | 'P1' | 'XEMEX_BLACK';
export type LoadSheddingStatus = 'CONNECTED' | 'NOT_CONNECTED';
export type Peak = 'ON_PEAK' | 'OFF_PEAK' | 'TRANSACTION_PEAK';
export type DeviceInfo = {
  softwareVersion: string;
  firmwareVersion: string;
  serial: string;
};
export type InstallationUsage = [number, number, number];
