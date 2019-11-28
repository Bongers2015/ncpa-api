import { Controller, Security, Route, Tags, Get } from 'tsoa';

import cpService from '../services/cp';
import { Transaction } from '../types';

export { Card } from '../types';

@Route('transactions')
export class TransactionsController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get()
  @Security('jwtAuth')
  @Tags('Charge point')
  public async getTransactions(): Promise<Transaction[]> {
    return new Promise(resolve => {
      resolve(cpService.getTransactions());
    });
  }
}
