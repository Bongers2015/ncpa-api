import { Controller, Security, Route, Tags, Get, Query } from 'tsoa';

import { DeviceInfo } from '../types';

import cpService from '../services/cp';

@Route('device-info')
@Security('jwtAuth', ['operator', 'installer'])
@Tags('operator')
export class DeviceInfoController extends Controller {
  /** jwt scopes: `operator` */
  @Get()
  public getDeviceInfo(@Query() clientId: string): DeviceInfo {
    cpService.checkClientId(clientId);
    return cpService.getDeviceInfo();
  }
}
