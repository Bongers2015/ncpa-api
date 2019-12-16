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
      onOffPeak: cpService.getOnOffPeak(),
      loadSheddingModule: cpService.getLoadSheddingStatus(),
      installationUsage: cpService.getInstallationUsage()
    };
  }
}
