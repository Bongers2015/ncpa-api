import { Controller, Security, Route, Tags, Get } from 'tsoa';

import { ChargePointStatus } from '../types';

import cpService from '../services/cp';

@Route('status')
@Security('jwtAuth')
@Tags('Charge point')
export class StatusController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get()
  public getChargePointStatus(): ChargePointStatus {
    const chargePointStatus = cpService.getChargePointStatus();
    return chargePointStatus;
  }
}
