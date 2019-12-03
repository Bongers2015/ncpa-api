import { Controller, Security, Route, Tags, Get } from 'tsoa';

import { Status } from '../types';

import cpService from '../services/cp';

@Route('status')
@Security('jwtAuth')
@Tags('operator')
export class StatusController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get()
  public getChargePointStatus(): Status {
    const chargePointStatus = cpService.getChargePointStatus();
    return chargePointStatus;
  }
}
