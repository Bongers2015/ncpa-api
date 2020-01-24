import { Controller, Get, Post, Route, Security, Tags, Query } from 'tsoa';

import { AuthorizationMode } from '../types';
import cpService from '../services/cp';

@Route('authentication-mode')
@Tags('operator')
@Security('jwtAuth', ['operator', `installer`])
export class AuthorizationModeController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get('/')
  public getAuthenticationMode(@Query() clientId: string): AuthorizationMode {
    cpService.checkClientId(clientId);
    return cpService.getAuthMode();
  }

  /** jwt scopes: `operator`, `installer` */
  @Post()
  public setAuthenticationMode(
    @Query() authenticationMode: AuthorizationMode,
    @Query() clientId: string
  ): AuthorizationMode {
    cpService.checkClientId(clientId);

    return cpService.setAuthMode(authenticationMode);
  }
}
