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
export interface ChargingScheduleSection {
  time: number;
  limit: number;
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

export type SocketLockMode = 'TRANSACTION' | 'LOCKED' | 'UNLOCKED';

export interface InstallerStatus {
  socketLockMode: SocketLockMode;
  gridMaxCurrent: number;
  loadSheddingModule: LoadSheddingStatus;
  chargeStationMaxCurrent: number;
  onOffPeak: Peak;
  installationUsage: InstallationUsage;
  gridCurrents: GridCurrents;
}

export type DeviceInfo = {
  softwareVersion: string;
  firmwareVersion: string;
  serial: string;
};
