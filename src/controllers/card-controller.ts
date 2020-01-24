import { Controller, Security, Route, Tags, Get, Query } from 'tsoa';

import { CardRegistration } from '../types';
import cpService from '../services/cp';

@Route('whitelist/card')
export class CardController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get()
  @Security('jwtAuth', ['operator', 'installer'])
  @Tags('operator')
  public async registerCard(
    // eslint-disable-next-line no-unused-vars
    @Query() clientId: string
  ): Promise<CardRegistration> {
    cpService.checkClientId(clientId);
    const cardRegistration = await cpService.cardRegistration();
    return new Promise(resolve => {
      if (cardRegistration.status === 'TIMEOUT') {
        this.setStatus(404);
      } else if (cardRegistration.status === 'FAILURE') {
        this.setStatus(503);
      }
      resolve(cardRegistration);
    });
  }
}
