import v4 from 'uuid/v4';

import {
  AuthorizationMode,
  CardId,
  CardRegistrationResponse,
  Card,
  CardRegistration,
  ChargePointStatus,
  Status,
  Transaction,
  SocketPermanentLockMode,
  ChargingTransactionPerCard,
  Peak,
  LoadShedding,
  DeviceInfo,
  InstallationUsage,
  GridCurrents,
  ChargingSchedule
} from '../types';

const MAX_NUMBER_OF_CARDS = 3;

const baseRfidCard: Card = {
  token: v4(),
  status: 'ACCEPTED'
};

let chargeStationMaxCurrent = 16;

let cards: Card[] = [baseRfidCard];
let chargePointStatus: Status = {
  // code: 0,
  chargePointStatus: 'OPERATIVE',
  numberOfRFIDCardsRegistered: cards.length,
  transactionStatus: [],
  connectorStatus: [],
  authorizationMode: 'WHITELIST',
  chargeStationMaxCurrent
};
const updateChargePointStatus = ({
  // code: newCode,
  statusMessage: newStatusMessage,
  numberOfRFIDCardsRegistered: newNumberOfRFIDCardsRegistered,
  authorizationMode: newAuthorizationMode
}: {
  statusMessage?: ChargePointStatus;
  numberOfRFIDCardsRegistered?: number;
  authorizationMode?: AuthorizationMode;
}): Status => {
  const { transactionStatus, connectorStatus }: Status = chargePointStatus;
  let {
    chargePointStatus: statusMessage,
    numberOfRFIDCardsRegistered,
    authorizationMode
  }: Status = chargePointStatus;

  if (newStatusMessage !== undefined && newStatusMessage !== statusMessage) {
    statusMessage = newStatusMessage;
  }

  if (
    newNumberOfRFIDCardsRegistered !== undefined &&
    newNumberOfRFIDCardsRegistered !== numberOfRFIDCardsRegistered
  ) {
    numberOfRFIDCardsRegistered = newNumberOfRFIDCardsRegistered;
  }
  if (
    newAuthorizationMode !== undefined &&
    newAuthorizationMode !== authorizationMode
  ) {
    authorizationMode = newAuthorizationMode;
  }

  chargePointStatus = {
    chargePointStatus: statusMessage,
    numberOfRFIDCardsRegistered,
    authorizationMode,
    transactionStatus,
    connectorStatus
  } as Status;
  return chargePointStatus;
};

let cardRegistrationResponse: CardRegistrationResponse = {
  status: 'SUCCESS',
  statusMessage: ''
};

const findCardById = (cardId: CardId): Card | undefined => {
  return cards.find(card => card.token === cardId);
};

const addCardById = (cardId: string): boolean => {
  if (cards.length < MAX_NUMBER_OF_CARDS && !findCardById(cardId)) {
    cards.push({ token: cardId, status: 'ACCEPTED' });
    updateChargePointStatus({ numberOfRFIDCardsRegistered: cards.length });
    return true;
  }
  return false;
};

const serial = '07A10012';
const getSerial = (): string => serial;

const getCardTransactions = (cardId: string): Transaction[] => {
  return [
    {
      id: v4(),
      token: cardId,
      startDate: 1231023123123,
      startWattHour: 4,
      consumedWattHours: 0
    }
  ];
};
const getTransactions = (): Transaction[] => {
  return [
    {
      id: v4(),
      token: cards[0].token,
      startDate: 1231023123123,
      stopDate: 1231023140000,
      startWattHour: 123,
      consumedWattHours: 0
    },
    {
      id: '1301',
      remoteId: null,
      token: `LCP${serial}`,
      startDate: 1583849111000,
      stopDate: 1583849274000,
      stopReason: null,
      startWattHour: 80,
      stopWattHour: 80,
      consumedWattHours: 0
    },
    {
      id: '1302',
      remoteId: null,
      token: `LCA${serial}`,
      startDate: 1583849291000,
      stopDate: 1583849369000,
      stopReason: null,
      startWattHour: 80,
      stopWattHour: 80,
      consumedWattHours: 0
    }
  ];
};
const getSplitBilling = (): ChargingTransactionPerCard[] => {
  return cards.map(card => {
    const totalDuration = Math.round(Math.random() * 1000);
    return {
      cardId: card.token,
      startDate: 'some start date',
      endDate: 'some end date',
      totalDuration,
      totalWattHourCharged: totalDuration * 12
    };
  });
};

let authMode: AuthorizationMode = 'WHITELIST';
const getAuthMode = (): AuthorizationMode => authMode;
const setAuthMode = (newAuthMode: AuthorizationMode): AuthorizationMode => {
  authMode = newAuthMode;
  chargePointStatus = { ...chargePointStatus, authorizationMode: authMode };
  return authMode;
};

let socketLockMode: SocketPermanentLockMode = 'UNLOCKED';
const getSocketLockMode = (): SocketPermanentLockMode => socketLockMode;
const setSocketLockMode = (
  newSocketLockMode: SocketPermanentLockMode
): SocketPermanentLockMode => {
  socketLockMode = newSocketLockMode;
  return socketLockMode;
};
let gridMaxCurrent = 0;
const getGridMaxCurrent = (): number => gridMaxCurrent;
const setGridMaxCurrent = (newGridMaxCurrent: number): number => {
  gridMaxCurrent = newGridMaxCurrent;
  return gridMaxCurrent;
};

let loadShedding: LoadShedding = 'NO';
const getLoadShedding = (): LoadShedding => loadShedding;
const setLoadShedding = (newLoadShedding: LoadShedding): LoadShedding => {
  loadShedding = newLoadShedding;
  return loadShedding;
};

const getChargeStationMaxCurrent = (): number => chargeStationMaxCurrent;
const setChargeStationMaxCurrent = (
  newChargeStationMaxCurrent: number
): number => {
  chargeStationMaxCurrent = newChargeStationMaxCurrent;
  return chargeStationMaxCurrent;
};

const getDeviceInfo = (): DeviceInfo => {
  return {
    evccVersion: '103.18.19 3_256d3',
    firmwareVersion: '1.7.9.0',
    model: 'HOMEADVANCEDSPRONQ',
    serial: getSerial(),
    hasLatchingDevice: true,
    phase: '1PHASE',
    absoluteMaxCurrent: 32,
    contractualMaxCurrent: 64
    // currentLimits: { hardLimit: 32, softLimit: 20, loadsheddingLimit: 24 }
  };
};

let onOffPeak: Peak = 'ON_PEAK';
const getOnOffPeak = (): Peak => onOffPeak;
const setOnOffPeak = (newOnOffPeak: Peak): Peak => {
  onOffPeak = newOnOffPeak;
  return onOffPeak;
};
let gridCurrents: GridCurrents = [3, 2, 1];
const getGridCurrents = (): GridCurrents => gridCurrents;
const setGridCurrents = (newGridCurrents: GridCurrents): GridCurrents => {
  gridCurrents = newGridCurrents;
  return gridCurrents;
};
let chargingSchedule: ChargingSchedule = { recurring: 'weekly', sections: [] };

const getChargingSchedule = (): ChargingSchedule => chargingSchedule;
const setChargingSchedule = (
  newChargingSchedule: ChargingSchedule
): ChargingSchedule => {
  chargingSchedule = newChargingSchedule;
  return chargingSchedule;
};
const getInstallationUsage = (): InstallationUsage => [1, 2, 3];

let shuntActive = false;

const activateShunt = (): boolean => {
  shuntActive = true;
  return shuntActive;
};

const deactivateShunt = (): boolean => {
  shuntActive = false;
  return shuntActive;
};

const checkClientId = (clientId: string): boolean => {
  // eslint-disable-next-line no-self-compare
  return clientId === clientId;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const startUpgrade = () => {
  updateChargePointStatus({
    ...chargePointStatus,
    statusMessage: 'UPGRADING'
  });
  setTimeout(() => {
    updateChargePointStatus({
      ...chargePointStatus,
      statusMessage: 'OPERATIVE'
    });
  }, 30000);
};

const updateCardLabel = (token: string, label: string): Card => {
  let updatedCard: Card;
  cards = cards.map(card => {
    if (card.token === token) {
      updatedCard = { ...card, label };
      return updatedCard;
    }
    return card;
  });
  return updatedCard;
};
export default {
  getCards: (): Card[] => {
    console.log('get cards', cards);
    return cards
      .filter(card => card.token !== baseRfidCard.token)
      .map(card => ({ ...card }));
  },
  addCardById,
  getCardById: (cardId: CardId): Card | undefined => {
    return findCardById(cardId);
  },
  // eslint-disable-next-line consistent-return
  deleteCardById: (cardId: CardId): Card | undefined | never => {
    if (cardId && cardId === baseRfidCard.token) {
      throw new Error(
        'This card is bound to the device, and can not be deleted'
      );
    }
    const [foundCard, newCards] = cards.reduce(
      ([foundCard, newCards], card) => {
        if (card.token === cardId) {
          return [card, newCards];
        }
        return [foundCard, [...newCards, card]];
      },
      [undefined, []]
    );

    if (foundCard !== undefined) {
      cards = newCards;
      updateChargePointStatus({ numberOfRFIDCardsRegistered: cards.length });
      return foundCard;
    }
  },

  updateCardById: (
    cardId: CardId,
    cardData: Partial<Omit<Card, 'id'>>
    // eslint-disable-next-line consistent-return
  ): Card | undefined | never => {
    if (cardId && cardId === baseRfidCard.token) {
      throw new Error(
        'This card is bound to the device, and can not be updated'
      );
    }
    const [foundCard, newCards] = cards.reduce(
      ([foundCard, newCards], card) => {
        if (card.token === cardId) {
          const updatedCard = { ...card, ...cardData };
          return [updatedCard, [...newCards, updatedCard]];
        }
        return [foundCard, [...newCards, card]];
      },
      [undefined, []]
    );

    if (foundCard !== undefined) {
      cards = newCards;
      return foundCard;
    }
  },
  // eslint-disable-next-line consistent-return
  updateCard: (givenCard: Card): Card | undefined | never => {
    if (givenCard && givenCard.token === baseRfidCard.token) {
      throw new Error(
        'This card is bound to the device, and can not be updated'
      );
    }
    const [foundCard, newCards] = cards.reduce(
      ([foundCard, newCards], card) => {
        if (card.token === givenCard.token) {
          const updatedCard = { ...card, ...givenCard };
          return [updatedCard, [...newCards, updatedCard]];
        }
        return [foundCard, [...newCards, card]];
      },
      [undefined, []]
    );

    if (foundCard !== undefined) {
      cards = newCards;
      return foundCard;
    }
  },
  cardRegistration: (): Promise<CardRegistration> => {
    let finalCardRegistrationResponse = cardRegistrationResponse;
    console.log('cards', cards);
    if (cards.length >= MAX_NUMBER_OF_CARDS) {
      finalCardRegistrationResponse = {
        status: 'FAILURE',
        statusMessage: `Maximum number of cards registered: ${MAX_NUMBER_OF_CARDS}`
      };
    }
    return new Promise(resolve => {
      setTimeout(() => {
        let card: Card;
        if (finalCardRegistrationResponse.status === 'SUCCESS') {
          const someRandomCardId = v4();
          if (addCardById(someRandomCardId)) {
            card = findCardById(someRandomCardId);
          }
        }
        resolve({
          card,
          ...finalCardRegistrationResponse
        });
      }, 2000);
    });
  },
  setCardRegistrationResponse: (
    giveCardRegistrationResponse: CardRegistrationResponse
  ): void => {
    cardRegistrationResponse = giveCardRegistrationResponse;
  },
  getChargePointStatus: (): Status => {
    return chargePointStatus;
  },
  startUpgrade,
  updateChargePointStatus,
  getCardTransactions,
  getTransactions,
  getSplitBilling,
  getAuthMode,
  setAuthMode,
  getSocketLockMode,
  setSocketLockMode,
  setGridMaxCurrent,
  getGridMaxCurrent,
  getSerial,
  getOnOffPeak,
  setOnOffPeak,
  getLoadShedding,
  setLoadShedding,
  getChargeStationMaxCurrent,
  setChargeStationMaxCurrent,
  getDeviceInfo,
  getInstallationUsage,
  activateShunt,
  deactivateShunt,
  getGridCurrents,
  setGridCurrents,
  getChargingSchedule,
  setChargingSchedule,
  checkClientId,
  updateCardLabel
};
