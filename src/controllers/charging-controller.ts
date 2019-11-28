import { Controller, Security, Route, Tags, Get } from 'tsoa';

@Route('charging')
export class ChargingController extends Controller {
  /** jwt scopes: `operator` ` */
  @Get('/start')
  @Security('jwtAuth')
  @Tags('operator')
  public startCharging(): void {}

  /** jwt scopes: `operator`  */
  @Get('/stop')
  @Security('jwtAuth')
  @Tags('operator')
  public stopCharging(): void {}
}
