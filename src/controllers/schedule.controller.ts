import { Controller, Security, Route, Tags, Post, Get, Body } from 'tsoa';

import cpService from '../services/cp';
import { ChargingSchedule } from '../types';

@Route('schedules')
export class ScheduleController extends Controller {
  /** jwt scopes: `operator` ` */
  @Get('/chargepoint')
  @Security('jwtAuth')
  @Tags('operator')
  public async getSchedule(): Promise<ChargingSchedule> {
    return new Promise(resolve => {
      resolve(cpService.getChargingSchedule());
    });
  }

  /** jwt scopes: `operator` ` */
  @Post('/chargepoint')
  @Security('jwtAuth')
  @Tags('operator')
  public async setSchedule(
    @Body() chargingSchedule: ChargingSchedule
  ): Promise<ChargingSchedule> {
    return new Promise(resolve => {
      resolve(cpService.setChargingSchedule(chargingSchedule));
    });
  }
}
