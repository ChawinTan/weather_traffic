import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

import { govtechTrafficBaseUrl } from '../constants';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getTrafficImages(date, time) {
    const url = `${govtechTrafficBaseUrl}?date-time=${date}${time}`;
    const trafficData = await this.httpService
      .get(url)
      .pipe(map((response) => response.data));
    return trafficData;
  }
}
