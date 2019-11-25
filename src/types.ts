export type CardRegistrationStatus = 'SUCCESS' | 'FAILURE' | 'TIMEOUT';
export type CardId = string;
export type CardOwner = string;

export interface Card {
  id: string;
  owner?: string;
  status?: string;
  exp?: string;
  editable?: boolean;
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
  uuid: string;
  startDate: string;
  stopDate: string;
  stopReason: string;
  startKWattHour: string;
  stopKWattHour: string;
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
  id: string;
}
export interface GetAuthQrResponse {
  host: string;
  qrDataUrl: string;
  requestUrl: string;
}
