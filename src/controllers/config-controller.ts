import { Controller, Get, Post, Route, Security, Tags, Query } from 'tsoa';

import { SocketLockMode, LoadShedding } from '../types';
import cpService from '../services/cp';

@Route('config')
@Security('jwtAuth')
export class ConfigController extends Controller {
  /** jwt scopes: `operator` */
  @Tags('operator')
  @Get('socket-lock-mode')
  public getSocketLockMode(): SocketLockMode {
    return cpService.getSocketLockMode();
  }

  /** jwt scopes: `operator` */
  @Tags('installer')
  @Post('socket-lock-mode')
  public setSocketLockMode(
    @Query() socketLockMode: SocketLockMode
  ): SocketLockMode {
    return cpService.setSocketLockMode(socketLockMode);
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('grid-max-current')
  public setGridMaxCurrent(@Query() maxCurrent: number): number {
    return cpService.setGridMaxCurrent(maxCurrent);
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('load-shedding')
  public setLoadShedding(@Query() loadShedding: LoadShedding): LoadShedding {
    return cpService.setLoadShedding(loadShedding);
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('charge-station-max-current')
  public setChargeStationMaxCurrent(
    @Query() chargeStationMaxCurrent: number
  ): number {
    return cpService.setChargeStationMaxCurrent(chargeStationMaxCurrent);
  }
}
