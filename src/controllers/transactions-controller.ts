import { Controller, Security, Route, Tags, Get, Query } from 'tsoa';

import cpService from '../services/cp';
import { ChargingTransaction } from '../types';

export { Card } from '../types';

@Route('transactions')
export class TransactionsController extends Controller {
  @Get()
  @Security('jwtAuth')
  @Tags('Charge point')
  public async getTransactions(
    @Query() after?: string
  ): Promise<ChargingTransaction[]> {
    console.log('after', after);
    return new Promise(resolve => {
      resolve(cpService.getTransactions());
    });
  }
}
