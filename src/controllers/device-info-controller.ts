import { Controller, Security, Route, Tags, Get } from 'tsoa';

import { DeviceInfo } from '../types';

import cpService from '../services/cp';

@Route('device-info')
@Security('jwtAuth')
@Tags('operator')
export class DeviceInfoController extends Controller {
  /** jwt scopes: `operator` */
  @Get()
  public getDeviceInfo(): DeviceInfo {
    return cpService.getDeviceInfo();
  }
}
