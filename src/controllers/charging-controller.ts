import { Controller, Security, Route, Tags, Post, Query } from 'tsoa';

@Route('charging')
export class ChargingController extends Controller {
  /** jwt scopes: `operator` ` */
  @Post('/start')
  @Security('jwtAuth')
  @Tags('operator')
  public startCharging(@Query() tag: string): void {
    console.log('startCharging tag', tag);
  }

  /** jwt scopes: `operator`  */
  @Post('/stop')
  @Security('jwtAuth')
  @Tags('operator')
  public stopCharging(@Query() tag: string): void {
    console.log('stopCharging tag', tag);
  }

  /** jwt scopes: `operator`  */
  @Post('/unlock')
  @Security('jwtAuth')
  @Tags('operator')
  public unlock(): void {}
}
