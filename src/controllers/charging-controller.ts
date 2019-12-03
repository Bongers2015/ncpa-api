import { Controller, Security, Route, Tags, Post, Query } from 'tsoa';

@Route('charging')
export class ChargingController extends Controller {
  /** jwt scopes: `operator` ` */
  @Post('/start')
  @Security('jwtAuth')
  @Tags('operator')
  public startCharging(@Query() clientId: string): void {
    console.log('startCharging clientId', clientId);
  }

  /** jwt scopes: `operator`  */
  @Post('/stop')
  @Security('jwtAuth')
  @Tags('operator')
  public stopCharging(@Query() clientId: string): void {
    console.log('stopCharging clientId', clientId);
  }

  /** jwt scopes: `operator`  */
  @Post('/unlock')
  @Security('jwtAuth')
  @Tags('operator')
  public unlock(): void {}
}
