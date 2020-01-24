import {
  Controller,
  Security,
  Route,
  Tags,
  Post,
  Get,
  Body,
  Query
} from 'tsoa';

import cpService from '../services/cp';
import { ChargingSchedule } from '../types';

@Route('schedules')
export class ScheduleController extends Controller {
  /** jwt scopes: `operator` ` */
  @Get('/chargepoint')
  @Security('jwtAuth', ['operator', 'installer'])
  @Tags('operator')
  public async getSchedule(
    @Query() clientId: string
  ): Promise<ChargingSchedule> {
    cpService.checkClientId(clientId);

    return new Promise(resolve => {
      resolve(cpService.getChargingSchedule());
    });
  }

  /** jwt scopes: `operator` ` */
  @Post('/chargepoint')
  @Security('jwtAuth', ['operator', 'installer'])
  @Tags('operator')
  public async setSchedule(
    @Body() chargingSchedule: ChargingSchedule,
    @Query() clientId: string
  ): Promise<ChargingSchedule> {
    cpService.checkClientId(clientId);

    return new Promise(resolve => {
      resolve(cpService.setChargingSchedule(chargingSchedule));
    });
  }
}
