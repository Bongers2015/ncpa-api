import { Controller, Security, Route, Tags, Get } from 'tsoa';

import { InstallerStatus } from '../types';

import cpService from '../services/cp';

@Route('installer-status')
@Security('jwtAuth')
@Tags('installer')
export class InstallerStatusController extends Controller {
  /** jwt scopes: `installer` */
  @Get()
  public getInstallerStatus(): InstallerStatus {
    return {
      socketLockMode: cpService.getSocketLockMode(),
      gridMaxCurrent: cpService.getGridMaxCurrent(),
      loadSheddingModule: cpService.getLoadSheddingStatus(),
      chargeStationMaxCurrent: cpService.getChargeStationMaxCurrent(),
      onOffPeak: cpService.getOnOffPeak(),
      installationUsage: cpService.getInstallationUsage(),
      gridCurrents: cpService.getGridCurrents()
    };
  }
}
