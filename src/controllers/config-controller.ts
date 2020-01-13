import {
  Controller,
  Get,
  Post,
  Route,
  Security,
  Tags,
  Query,
  Body
} from 'tsoa';

import { GridCurrents, SocketLockMode, LoadShedding, Peak } from '../types';
import cpService from '../services/cp';

@Route('config')
@Security('jwtAuth')
export class ConfigController extends Controller {
  /** jwt scopes: `installer` */
  @Tags('installer')
  @Get('socket-lock-mode')
  public getSocketLockMode(): SocketLockMode {
    return cpService.getSocketLockMode();
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('socket-lock-mode')
  public setSocketLockMode(
    @Query() socketLockMode: SocketLockMode
  ): SocketLockMode {
    return cpService.setSocketLockMode(socketLockMode);
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Get('grid-max-current')
  public getGridMaxCurrent(): number {
    return cpService.getGridMaxCurrent();
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('grid-max-current')
  public setGridMaxCurrent(@Query() maxCurrent: number): number {
    return cpService.setGridMaxCurrent(maxCurrent);
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Get('load-shedding')
  public getLoadShedding(): LoadShedding {
    return cpService.getLoadShedding();
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('load-shedding')
  public setLoadShedding(@Query() loadShedding: LoadShedding): LoadShedding {
    return cpService.setLoadShedding(loadShedding);
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Get('charge-station-max-current')
  public getChargeStationMaxCurrent(): number {
    return cpService.getChargeStationMaxCurrent();
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('charge-station-max-current')
  public setChargeStationMaxCurrent(
    @Query() chargeStationMaxCurrent: number
  ): number {
    return cpService.setChargeStationMaxCurrent(chargeStationMaxCurrent);
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Get('on-off-peak')
  public getOnOffPeak(): Peak {
    return cpService.getOnOffPeak();
  }

  /** jwt scopes: `installer` */
  @Tags('installer')
  @Post('on-off-peak')
  public setOnOffPeak(@Query() onOffPeak: Peak): Peak {
    return cpService.setOnOffPeak(onOffPeak);
  }

  /** jwt scopes: `installer` 
 
  */
  @Tags('installer')
  @Get('grid-currents')
  public getGridCurrents(): GridCurrents {
    return cpService.getGridCurrents();
  }

  /** jwt scopes: `installer` 

  min 1 item, max 3
  */
  @Tags('installer')
  @Post('grid-currents')
  public setGridCurrents(
    @Query()
    gridCurrents: string
  ): GridCurrents {
    return cpService.setGridCurrents(gridCurrents.split(',').map(Number));
  }

  /** jwt scopes: `installer` 
   * 
Reboots CP
  */
  @Tags('installer')
  @Post('reboot')
  public reboot(): void {}
}
