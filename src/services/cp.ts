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
  SocketLockMode,
  ChargingTransactionPerCard
} from '../types';

const MAX_NUMBER_OF_CARDS = 3;

const baseRfidCard: Card = {
  token: v4(),
  status: 'ACCEPTED'
};

let cards: Card[] = [baseRfidCard];
let chargePointStatus: Status = {
  // code: 0,
  chargePointStatus: 'OPERATIVE',
  numberOfRFIDCardsRegistered: cards.length,
  transactionStatus: [],
  connectorStatus: [],
  authorizationMode: 'WHITELIST'
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
  getChargePointStatus: (): Status => {
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
