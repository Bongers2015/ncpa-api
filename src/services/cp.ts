import v4 from 'uuid/v4';

import {
  CardId,
  // CardOwner,
  // CardRegistrationStatus,
  CardRegistrationResponse,
  Card,
  CardRegistration,
  ChargePointStatuCode,
  ChargePointStatusMessage,
  ChargePointStatus,
  ChargingTransaction,
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
  id: v4(),
  owner: `chargepoint-${v4()}`,
  editable: false
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
  return cards.find(card => card.id === cardId);
};

const addCardById = (cardId: string): boolean => {
  if (cards.length < MAX_NUMBER_OF_CARDS && !findCardById(cardId)) {
    cards.push({ id: cardId });
    updateChargePointStatus({ numberOfRFIDCardsRegistered: cards.length });
    return true;
  }
  return false;
};

const getCardTransactions = (cardId: string): ChargingTransaction[] => {
  return [{ cardId, startedAt: 'now', duration: 6, WattHourCharged: 4 }];
};
const getTransactions = (): ChargingTransaction[] => {
  return [
    { cardId: cards[0].id, startedAt: 'now', duration: 6, WattHourCharged: 4 }
  ];
};
const getSplitBilling = (): ChargingTransactionPerCard[] => {
  return cards.map(card => {
    const totalDuration = Math.round(Math.random() * 1000);
    return {
      cardId: card.id,
      startDate: 'some start date',
      endDate: 'some end date',
      totalDuration,
      totalWattHourCharged: totalDuration * 12
    };
  });
};
export default {
  getCards: (): Card[] => {
    return cards.map(card => ({ ...card }));
  },
  addCardById,
  deleteCardById: (cardId: CardId): Card | undefined | never => {
    if (cardId && cardId === baseRfidCard.id) {
      throw new Error(
        'This card is bound to the device, and can not be deleted'
      );
    }
    const [foundCard, newCards] = cards.reduce(
      ([foundCard, newCards], card) => {
        if (card.id === cardId) {
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
    if (cardId && cardId === baseRfidCard.id) {
      throw new Error(
        'This card is bound to the device, and can not be updated'
      );
    }
    const [foundCard, newCards] = cards.reduce(
      ([foundCard, newCards], card) => {
        if (card.id === cardId) {
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
    if (givenCard && givenCard.id === baseRfidCard.id) {
      throw new Error(
        'This card is bound to the device, and can not be updated'
      );
    }
    const [foundCard, newCards] = cards.reduce(
      ([foundCard, newCards], card) => {
        if (card.id === givenCard.id) {
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
  getSplitBilling
};
