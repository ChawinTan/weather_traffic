import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('traffic')
  getTrafficImageData() {
    return this.appService.getTrafficImages('2022-11-11', null);
  }

  @Get('location')
  getAddress() {
    return this.appService.parseGeoLocation('1.323957439', '103.8728576')
  }
}
