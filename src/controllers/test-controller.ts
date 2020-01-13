import { Controller, Security, Route, Tags, Post } from 'tsoa';

import cpService from '../services/cp';

@Route('tests')
@Security('jwtAuth')
@Tags('installer')
export class TestController extends Controller {
  /** jwt scopes: `installer` */
  @Post('shunt/activate')
  public setActivateShunt(): boolean {
    return cpService.activateShunt();
  }
}
