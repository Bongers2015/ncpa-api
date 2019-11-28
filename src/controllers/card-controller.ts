import { Controller, Security, Route, Tags, Get } from 'tsoa';

import { CardRegistration } from '../types';
import cpService from '../services/cp';

@Route('whitelist/card')
export class CardController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get()
  @Security('jwtAuth')
  @Tags('Charge point')
  public async registerCard(): Promise<CardRegistration> {
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
