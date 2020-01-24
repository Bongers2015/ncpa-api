import { Controller, Security, Route, Tags, Get, Query } from 'tsoa';

import { Status } from '../types';

import cpService from '../services/cp';

@Route('status')
@Security('jwtAuth', ['operator', 'installer'])
@Tags('operator')
export class StatusController extends Controller {
  /** jwt scopes: `operator` */
  @Get()
  public getChargePointStatus(@Query() clientId: string): Status {
    cpService.checkClientId(clientId);

    const chargePointStatus = cpService.getChargePointStatus();
    return chargePointStatus;
  }
}
