import { Controller, Security, Route, Tags, Get } from 'tsoa';

import { CardRegistration } from '../types';
import cpService from '../services/cp';

@Route('charging')
export class ChargingController extends Controller {
  /** jwt scopes: `operator` ` */
  @Get('/start')
  @Security('jwtAuth')
  @Tags('Charge point')
  public  startCharging(): void {
    
  }
  /** jwt scopes: `operator`  */
  @Get('/stop')
  @Security('jwtAuth')
  @Tags('Charge point')
  public  stopCharging(): void {
    
  }
}
