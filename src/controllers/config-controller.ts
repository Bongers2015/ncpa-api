import { Controller, Get, Post, Route, Security, Tags, Query } from 'tsoa';

import { GridCurrents, SocketLockMode, LoadShedding, Peak } from '../types';
import cpService from '../services/cp';

@Route('config')
@Security('jwtAuth')
export class ConfigController extends Controller {
  /** jwt scopes: `installer` */
  @Tags('installer')
  @Get('socket-lock-mode')
  public getSocketLockMode(@Query() clientId: string): SocketLockMode {
    cpService.checkClientId(clientId);
    return cpService.getSocketLockMode();
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('socket-lock-mode')
  public setSocketLockMode(
    @Query() socketLockMode: SocketLockMode,
    @Query() clientId: string
  ): SocketLockMode {
    cpService.checkClientId(clientId);
    return cpService.setSocketLockMode(socketLockMode);
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Get('grid-max-current')
  public getGridMaxCurrent(@Query() clientId: string): number {
    cpService.checkClientId(clientId);
    return cpService.getGridMaxCurrent();
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('grid-max-current')
  public setGridMaxCurrent(
    @Query() maxCurrent: number,
    @Query() clientId: string
  ): number {
    cpService.checkClientId(clientId);
    return cpService.setGridMaxCurrent(maxCurrent);
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Get('load-shedding')
  public getLoadShedding(@Query() clientId: string): LoadShedding {
    cpService.checkClientId(clientId);
    return cpService.getLoadShedding();
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('load-shedding')
  public setLoadShedding(
    @Query() loadShedding: LoadShedding,
    @Query() clientId: string
  ): LoadShedding {
    cpService.checkClientId(clientId);
    return cpService.setLoadShedding(loadShedding);
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Get('charge-station-max-current')
  public getChargeStationMaxCurrent(@Query() clientId: string): number {
    cpService.checkClientId(clientId);
    return cpService.getChargeStationMaxCurrent();
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('charge-station-max-current')
  public setChargeStationMaxCurrent(
    @Query() chargeStationMaxCurrent: number,
    @Query() clientId: string
  ): number {
    cpService.checkClientId(clientId);
    return cpService.setChargeStationMaxCurrent(chargeStationMaxCurrent);
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Get('on-off-peak')
  public getOnOffPeak(@Query() clientId: string): Peak {
    cpService.checkClientId(clientId);
    return cpService.getOnOffPeak();
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('on-off-peak')
  public setOnOffPeak(
    @Query() onOffPeak: Peak,
    @Query() clientId: string
  ): Peak {
    cpService.checkClientId(clientId);
    return cpService.setOnOffPeak(onOffPeak);
  }

  /** jwt scopes: `installer` 
 
  */
  @Tags('installer')
  @Get('grid-currents')
  public getGridCurrents(@Query() clientId: string): GridCurrents {
    cpService.checkClientId(clientId);
    return cpService.getGridCurrents();
  }

  /** jwt scopes: `installer` 

  min 1 item, max 3
  */
  @Tags('installer')
  @Post('grid-currents')
  public setGridCurrents(
    @Query()
    gridCurrents: string,
    @Query() clientId: string
  ): GridCurrents {
    cpService.checkClientId(clientId);
    return cpService.setGridCurrents(gridCurrents.split(',').map(Number));
  }

  /** jwt scopes: `installer` 
   * 
Reboots CP
  */
  @Tags('installer')
  @Post('reboot')
  public reboot(@Query() clientId: string): void {
    cpService.checkClientId(clientId);
    /* eslint-disable-next-line */
    console.log('reboot!')
  }
}
