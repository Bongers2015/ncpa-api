import { Controller, Security, Route, Tags, Get } from 'tsoa';

import cpService from '../services/cp';
import { ChargingTransactionPerCard } from '../types';

export { Card } from '../types';

@Route('split-billing')
export class SplitBillingController extends Controller {
  @Get()
  @Security('jwtAuth')
  @Tags('Charge point')
  public async getSplitBilling(): Promise<ChargingTransactionPerCard[]> {
    return new Promise(resolve => {
      resolve(cpService.getSplitBilling());
    });
  }
}
