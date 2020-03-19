import { rejects } from 'assert';

import {
  Controller,
  Security,
  Delete,
  Route,
  Tags,
  Get,
  Query,
  Post
} from 'tsoa';

import cpService from '../services/cp';
import { Card } from '../types';

@Route('whitelist/cards')
export class CardsController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get()
  @Security('jwtAuth', [`operator`, `installer`])
  @Tags('operator')
  public async getCards(@Query() clientId: string): Promise<Card[]> {
    cpService.checkClientId(clientId);
    return new Promise(resolve => {
      resolve(cpService.getCards());
    });
  }

  /** jwt scopes: `operator`, `installer` */
  @Get('{token}')
  @Security('jwtAuth', [`operator`, `installer`])
  @Tags('operator')
  public async getCard(
    token: string,
    @Query() clientId: string
  ): Promise<Card> {
    cpService.checkClientId(clientId);
    return new Promise(resolve => {
      resolve(cpService.getCardById(token));
    });
  }

  /** jwt scopes: `operator`, `installer` */
  @Post('{token}')
  @Security('jwtAuth', [`operator`, `installer`])
  @Tags('operator')
  public async updateCardLabel(
    token: string,
    @Query() clientId: string,
    @Query() label: string
  ): Promise<Card> {
    cpService.checkClientId(clientId);
    return new Promise((resolve, reject) => {
      const updatedCard: Card = cpService.updateCardLabel(token, label);
      if (updatedCard) {
        resolve(updatedCard);
      } else {
        reject(new Error('Could not find card'));
      }
    });
  }

  /** jwt scopes: `operator`, `installer` */
  @Delete('{token}')
  @Security('jwtAuth', ['operator', 'installer'])
  @Tags('operator')
  public async deleteCard(
    token: string,
    @Query() clientId: string
  ): Promise<Card> {
    cpService.checkClientId(clientId);
    return new Promise(resolve => {
      try {
        const card = cpService.deleteCardById(token);
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
