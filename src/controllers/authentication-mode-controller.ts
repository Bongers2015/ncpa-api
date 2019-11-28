import { Controller, Get, Post, Route, Security, Tags, Query } from 'tsoa';

import { AuthMode } from '../types';
import cpService from '../services/cp';

@Route('authentication-mode')
@Tags('Charge point')
@Security('jwtAuth')
export class AuthenticationModeController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get('/')
  public getAuthenticationMode(): AuthMode {
    return cpService.getAuthMode();
  }

  /** jwt scopes: `operator`, `installer` */
  @Post()
  public setAuthenticationMode(
    @Query() authenticationMode: AuthMode
  ): AuthMode {
    return cpService.setAuthMode(authenticationMode);
  }
}
