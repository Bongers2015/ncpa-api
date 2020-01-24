import { Controller, Security, Route, Tags, Post, Query } from 'tsoa';

import cpService from '../services/cp';

@Route('tests')
@Security('jwtAuth', ['installer'])
@Tags('installer')
export class TestController extends Controller {
  /** jwt scopes: `installer` */
  @Post('shunt/activate')
  public setActivateShunt(@Query() clientId: string): boolean {
    cpService.checkClientId(clientId);

    return cpService.activateShunt();
  }
}
