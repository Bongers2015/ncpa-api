import { Controller, Security, Route, Tags, Get, Post } from 'tsoa';

import { Status, Peak, LoadSheddingStatus, InstallationUsage } from '../types';

import cpService from '../services/cp';

@Route('test')
@Security('jwtAuth')
@Tags('operator')
export class TestController extends Controller {
 
  /** jwt scopes: `installer` */
  @Post('shunt/activate')
  public setActivateShunt(): boolean {
    return cpService.activateShunt();
  }

  /** jwt scopes: `installer` */
  @Post('shunt/deactivate')
  public getLoadSheddingModule(): boolean {
    return cpService.deactivateShunt();
  }

}
