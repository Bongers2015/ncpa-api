import { Controller, Get, Post, Route, Security, Tags, Query } from 'tsoa';

import { AuthorizationMode } from '../types';
import cpService from '../services/cp';

@Route('authentication-mode')
@Tags('operator')
@Security('jwtAuth')
export class AuthorizationModeController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get('/')
  public getAuthenticationMode(): AuthorizationMode {
    return cpService.getAuthMode();
  }

  /** jwt scopes: `operator`, `installer` */
  @Post()
  public setAuthenticationMode(
    @Query() authenticationMode: AuthorizationMode
  ): AuthorizationMode {
    return cpService.setAuthMode(authenticationMode);
  }
}
