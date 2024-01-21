import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

interface QueryProps {
  date: string;
  time: string;
}

interface LocationProps {
  lat: string;
  lon: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('traffic')
  getTrafficImageData(@Query() query: QueryProps) {
    return this.appService.getTrafficImages(query.date, query.time);
  }

  @Post('location')
  getAddress(@Query() query: LocationProps) {
    return this.appService.parseGeoLocation(query.lat, query.lon)
  }
}
