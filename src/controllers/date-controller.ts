import { Controller, Get, Post, Route, Security, Tags, Query } from 'tsoa';

@Route('date')
@Tags('Charge point')
@Security('jwtAuth')
export class DateController extends Controller {
  /** jwt scopes: `operator`, `installer` */
  @Get()
  public getDate(): number {
    return Date.now();
  }

  /** jwt scopes: `operator`, `installer` */
  @Post()
  public setDate(@Query() now: number): number {
    return now;
  }
}
