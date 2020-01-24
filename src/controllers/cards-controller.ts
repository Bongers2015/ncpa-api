import { Controller, Security, Delete, Route, Tags, Get, Query } from 'tsoa';

import cpService from '../services/cp';
import { Card } from '../types';

@Route('whitelist/cards')
export class CardsController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get()
  @Security('jwtAuth')
  @Tags('operator')
  public async getCards(@Query() clientId: string): Promise<Card[]> {
    cpService.checkClientId(clientId);
    return new Promise(resolve => {
      resolve(cpService.getCards());
    });
  }

  /** jwt scopes: `operator`, `installer` */
  @Get('{token}')
  @Security('jwtAuth')
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
  @Delete('{token}')
  @Security('jwtAuth')
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
