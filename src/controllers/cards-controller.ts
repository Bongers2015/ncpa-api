import {
  Controller,
  Security,
  Put,
  Delete,
  Route,
  Tags,
  Get,
  Body,
  Query
} from 'tsoa';

import cpService from '../services/cp';
import { Card, ChargingTransaction } from '../types';

export { Card } from '../types';

export interface UpdateCardRequest {
  owner: string;
}

@Route('cards')
export class CardsController extends Controller {
  @Get()
  @Security('jwtAuth')
  @Tags('Charge point')
  public async getCards(): Promise<Card[]> {
    return new Promise(resolve => {
      resolve(cpService.getCards());
    });
  }

  @Get('{cardId}/transactions')
  @Security('jwtAuth')
  @Tags('Charge point')
  public async getCardTransations(
    cardId: string,
    @Query() after?: string
  ): Promise<ChargingTransaction[]> {
    console.log('after', after);
    return new Promise(resolve => {
      resolve(cpService.getCardTransactions(cardId));
    });
  }

  @Put('{cardId}')
  @Security('jwtAuth')
  @Tags('Charge point')
  public async updateCard(
    cardId: string,
    @Body() updateCardRequest: UpdateCardRequest
  ): Promise<Card> {
    return new Promise(resolve => {
      try {
        const card = cpService.updateCardById(cardId, updateCardRequest);
        if (card) {
          resolve(card);
        }
      } catch (e) {
        this.setStatus(403);
        resolve(e);
      }
    });
  }

  @Delete('{cardId}')
  @Security('jwtAuth')
  @Tags('Charge point')
  public async deleteCard(cardId: string): Promise<Card> {
    return new Promise(resolve => {
      try {
        const card = cpService.deleteCardById(cardId);
        if (card) {
          resolve(card);
        }
      } catch (e) {
        this.setStatus(403);
        resolve(e);
      }
    });
  }
}
