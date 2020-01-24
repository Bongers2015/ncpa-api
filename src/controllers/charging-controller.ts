import { Controller, Security, Route, Tags, Post, Query } from 'tsoa';

import cpService from '../services/cp';

@Route('charging')
export class ChargingController extends Controller {
  /** jwt scopes: `operator` ` */
  @Post('/start')
  @Security('jwtAuth', ['operator', 'installer'])
  @Tags('operator')
  public startCharging(@Query() tag: string, @Query() clientId: string): void {
    cpService.checkClientId(clientId);
    /* eslint-disable-next-line */
    console.log('startCharging tag', tag);
  }

  /** jwt scopes: `operator`  */
  @Post('/stop')
  @Security('jwtAuth', ['operator', 'installer'])
  @Tags('operator')
  public stopCharging(@Query() tag: string, @Query() clientId: string): void {
    cpService.checkClientId(clientId);
    /* eslint-disable-next-line */
    console.log('stopCharging tag', tag);
  }

  /** jwt scopes: `operator`  */
  @Post('/unlock')
  @Security('jwtAuth', ['operator', 'installer'])
  @Tags('operator')
  public unlock(@Query() clientId: string): void {
    cpService.checkClientId(clientId);
    /* eslint-disable-next-line */
    console.log('unlock!')
  }
}
