import { Controller, Security, Delete, Route, Tags, Get } from 'tsoa';

import cpService from '../services/cp';
import { Card } from '../types';

@Route('whitelist/cards')
export class CardsController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get()
  @Security('jwtAuth')
  @Tags('Charge point')
  public async getCards(): Promise<Card[]> {
    return new Promise(resolve => {
      resolve(cpService.getCards());
    });
  }

  /** jwt scopes: `operator`, `installer` */
  @Get('{token}')
  @Security('jwtAuth')
  @Tags('Charge point')
  public async getCard(token: string): Promise<Card> {
    return new Promise(resolve => {
      resolve(cpService.getCardById(token));
    });
  }

  /** jwt scopes: `operator`, `installer` */
  @Delete('{token}')
  @Security('jwtAuth')
  @Tags('Charge point')
  public async deleteCard(token: string): Promise<Card> {
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
