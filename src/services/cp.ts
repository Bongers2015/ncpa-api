import v4 from 'uuid/v4';

import {
  AuthMode,
  CardId,
  CardRegistrationResponse,
  Card,
  CardRegistration,
  ChargePointStatuCode,
  ChargePointStatusMessage,
  ChargePointStatus,
  Transaction,
  SocketLockMode,
  ChargingTransactionPerCard
} from '../types';

const MAX_NUMBER_OF_CARDS = 3;

export const chargePointStatuses: {
  [key in ChargePointStatuCode]: ChargePointStatusMessage;
} = {
  0: 'Available',
  1: 'Preparing',
  2: 'Charging',
  3: 'SuspendedEV',
  4: 'SuspendedEVSE',
  5: 'Finishing',
  6: 'Faulted'
};
const baseRfidCard: Card = {
  token: v4(),
  status: 'ACCEPTED'
};

let cards: Card[] = [baseRfidCard];
let chargePointStatus: ChargePointStatus = {
  code: 0,
  statusMessage: 'Available',
  numberOfRFIDCardsRegistered: cards.length,
  plugAndChargeEnabled: false
};
const updateChargePointStatus = ({
  code: newCode,
  numberOfRFIDCardsRegistered: newNumberOfRFIDCardsRegistered,
  plugAndChargeEnabled: newPlugAndChargeEnabled
}: {
  code?: ChargePointStatus['code'];
  numberOfRFIDCardsRegistered?: number;
  plugAndChargeEnabled?: boolean;
}): ChargePointStatus => {
  let {
    code,
    statusMessage,
    numberOfRFIDCardsRegistered,
    plugAndChargeEnabled
  }: ChargePointStatus = chargePointStatus;

  if (newCode !== undefined && newCode !== chargePointStatus[newCode]) {
    code = newCode;
    const newStatusMessage = chargePointStatuses[code];
    if (newStatusMessage) {
      statusMessage = newStatusMessage;
    }
  }

  if (
    newNumberOfRFIDCardsRegistered !== undefined &&
    newNumberOfRFIDCardsRegistered !== numberOfRFIDCardsRegistered
  ) {
    numberOfRFIDCardsRegistered = newNumberOfRFIDCardsRegistered;
  }
  if (
    newPlugAndChargeEnabled !== undefined &&
    newPlugAndChargeEnabled !== plugAndChargeEnabled
  ) {
    plugAndChargeEnabled = newPlugAndChargeEnabled;
  }

  chargePointStatus = {
    code,
    statusMessage,
    numberOfRFIDCardsRegistered,
    plugAndChargeEnabled
  } as ChargePointStatus;
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

const getCardTransactions = (cardId: string): Transaction[] => {
  return [{ id: v4(), token: cardId, startDate: 'now', startKWattHour: 4 }];
};
const getTransactions = (): Transaction[] => {
  return [
    {
      id: v4(),
      token: cards[0].token,
      startDate: 'now',
      stopDate: '',
      startKWattHour: 123
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

let authMode: AuthMode = 'WHITELIST';
const getAuthMode = (): AuthMode => authMode;
const setAuthMode = (newAuthMode: AuthMode): AuthMode => {
  authMode = newAuthMode;
  return authMode;
};
let socketLockMode: SocketLockMode = 'UNLOCKED';
const getSocketLockMode = (): SocketLockMode => socketLockMode;
const setSocketLockMode = (
  newSocketLockMode: SocketLockMode
): SocketLockMode => {
  socketLockMode = newSocketLockMode;
  return socketLockMode;
};
export default {
  getCards: (): Card[] => {
    return cards.map(card => ({ ...card }));
  },
  addCardById,
  getCardById: (cardId: CardId): Card | undefined => {
    return findCardById(cardId);
  },
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
  getChargePointStatus: (): ChargePointStatus => {
    return chargePointStatus;
  },
  updateChargePointStatus,
  getCardTransactions,
  getTransactions,
  getSplitBilling,
  getAuthMode,
  setAuthMode,
  getSocketLockMode,
  setSocketLockMode
};
