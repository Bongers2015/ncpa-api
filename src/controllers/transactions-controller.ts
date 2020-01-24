import { Controller, Security, Route, Tags, Get, Query } from 'tsoa';

import cpService from '../services/cp';
import { Transaction } from '../types';

export { Card } from '../types';

@Route('transactions')
export class TransactionsController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get()
  @Security('jwtAuth', ['operator', 'installer'])
  @Tags('operator')
  public async getTransactions(
    @Query() clientId: string
  ): Promise<Transaction[]> {
    cpService.checkClientId(clientId);
    return new Promise(resolve => {
      resolve(cpService.getTransactions());
    });
  }
}
