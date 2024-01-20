import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

import {
  govtechTrafficBaseUrl,
  geoapifyBaseUrl,
  geoapifyKey,
} from '../constants';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getReverseGeoUrl(lat: string, lon: string) {
    return `${geoapifyBaseUrl}?lat=${lat}&lon=${lon}&apiKey=${geoapifyKey}`;
  }

  async parseGeoLocation(lat: string, lon: string) {
    const reversedGeo = this.httpService
    .get(
      this.getReverseGeoUrl(
        lat,
        lon,
      ),
    )
    .pipe(
      map((res) => {
        const reverseGeoObj = res.data.features[0].properties;
        return `${reverseGeoObj.address_line1} ${reverseGeoObj.address_line2}`;
      }),
    );
    return reversedGeo
  }

  async getTrafficImages(date: string, time: string) {
    const url = `${govtechTrafficBaseUrl}?date-time=${date}${time}`;
    const parsedImgArray = [];

    const trafficData = this.httpService.get(url).pipe(
      map((response) => {
        const imgArray = response.data.items[0].cameras.slice(2);
        for (let i = 0; i < imgArray.length; i++) {
          const img = imgArray[i];
          const parsedImgObj = {
            lat: img.location.latitude,
            lon: img.location.longitude,
            imgUrl: img.image,
          };
          parsedImgArray.push(parsedImgObj);
        }
        return parsedImgArray;
      }));
    return trafficData;
  }
}
