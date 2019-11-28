import { Controller, Get, Post, Route, Security, Tags, Query } from 'tsoa';

import { SocketLockMode } from '../types';
import cpService from '../services/cp';

@Route('config')
@Tags('Charge point')
@Security('jwtAuth')
export class ConfigController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get('socket-lock-mode')
  public getSocketLockMode(): SocketLockMode {
    return cpService.getSocketLockMode();
  }

  /** jwt scopes: `operator`, `installer` */
  @Post('socket-lock-mode')
  public setSocketLockMode(
    @Query() socketLockMode: SocketLockMode
  ): SocketLockMode {
    return cpService.setSocketLockMode(socketLockMode);
  }
}
