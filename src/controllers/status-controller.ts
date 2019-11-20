import { Controller, Security, Route, Tags, Get, Put, Body } from 'tsoa';

import { ChargePointStatus, ChargePointStatusUpdate } from '../types';

import cpService from '../services/cp';
import cp from '../services/cp';

export { ChargePointStatus } from '../types';

@Route('status')
export class StatusController extends Controller {
  @Get()
  @Security('jwtAuth')
  @Tags('Charge point')
  public getChargePointStatus(): ChargePointStatus {
    const chargePointStatus = cpService.getChargePointStatus();
    return chargePointStatus;
  }

  @Put()
  @Security('jwtAuth')
  @Tags('Charge point')
  public updateChargePointStatus(
    @Body() chargePointStatusUpdate: ChargePointStatusUpdate
  ): ChargePointStatus {
    console.log('chargePointStatusUpdate', chargePointStatusUpdate);
    cp.updateChargePointStatus({ ...chargePointStatusUpdate });
    const chargePointStatus = cpService.getChargePointStatus();
    return chargePointStatus;
  }
}
