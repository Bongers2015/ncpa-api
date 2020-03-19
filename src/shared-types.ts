export type CardRegistrationStatus = 'SUCCESS' | 'FAILURE' | 'TIMEOUT';
export type CardId = string;
export type CardOwner = string;
export type AuthorizationMode = 'PLUGNCHARGE' | 'WHITELIST';

export type AuthorizationScope = 'operator' | 'installer';
export type ExpandedAuthorizationScope =
  | 'identity_operator'
  | 'identity_installer';
export type LoadSheddingStatus = 'CONNECTED' | 'NOT_CONNECTED';

export type LoadShedding = 'NO' | 'P1' | 'XEMEX_BLACK' | 'XEMEX_9600';
export type Peak = 'ON_PEAK' | 'OFF_PEAK' | 'TRANSACTION_PEAK';
export type InstallationUsage = [number, number, number];

export type GridCurrents = number[];
export type ChargePointStatus =
  | 'OPERATIVE'
  | 'INOPERATIVE'
  | 'FAULTED'
  | 'UPGRADING';
export type TransactionStatus =
  | 'AVAILABLE'
  | 'PREPARING'
  | 'CHARGING'
  | 'SUSPENDED_EV' // car says: im full, cable is locked
  | 'SUSPENDED_EVSE' //
  | 'FINISHING' // unlocking
  | 'FAULTED';
export type ConnectorStatus = 'OPERATIVE' | 'INOPERATIVE' | 'FAULTED';

export interface Status {
  chargePointStatus: ChargePointStatus;
  transactionStatus: TransactionStatus[];
  connectorStatus: ConnectorStatus[];
  authorizationMode: AuthorizationMode;
  chargeStationMaxCurrent: number;
  /**
   * @isLong longValue
   */
  numberOfRFIDCardsRegistered: number;
}
export interface ChargingScheduleSection {
  time: number;
  limit: number; // chargeStationMaxCurrent
}
export interface ChargingSchedule {
  recurring: 'weekly' | 'daily' | 'none';
  sections: ChargingScheduleSection[];
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IDTokenPayload {
  role: ExpandedAuthorizationScope;
}
export interface QRPayload {
  SSID: string;
  Encryption: 'WPA2';
  Password: string;
  /* <identityToken|installerToken>, Which one depends the QR code */
  tok: string;
  /* <chargepoint serial> to be used to when registering the user to link them to the CP */
  cp: string;
}

export type SocketPermanentLockMode = 'TRANSACTION' | 'LOCKED' | 'UNLOCKED';

export interface InstallerStatus {
  socketLockMode: SocketPermanentLockMode;
  gridMaxCurrent: number;
  loadSheddingModule: LoadShedding;
  chargeStationMaxCurrent: number;
  onOffPeak: Peak;
  installationUsage: InstallationUsage;
  gridCurrents: GridCurrents;
}
export type Phase = '1PHASE' | '3PHASE';

export interface DeviceInfo {
  evccVersion: string;
  firmwareVersion: string;
  model: string;
  serial: string;
  hasLatchingDevice: boolean;
  phase: Phase;
  /** hard limit */
  absoluteMaxCurrent: number; // hardLimit
  /** soft limit */
  contractualMaxCurrent: number; // softLimit
}

export interface Card {
  /** RFID  */
  token: string;
  status: 'ACCEPTED' | 'BLOCKED' | 'EXPIRED' | 'INVALID' | 'UNKNOWN';
  expirationDate?: string;
  label?: string;
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
