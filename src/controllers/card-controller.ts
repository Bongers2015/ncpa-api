import { Controller, Security, Route, Tags, Get } from 'tsoa';

import { CardRegistration } from '../types';
import cpService from '../services/cp';

export { CardRegistration } from '../types';

@Route('card')
export class CardController extends Controller {
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