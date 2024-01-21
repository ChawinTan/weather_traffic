import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

import {
  govtechTrafficBaseUrl,
  geoapifyBaseUrl,
  geoapifyKey,
  govtechWeatherBaseUrl
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
    const url = `${govtechTrafficBaseUrl}?date-time=${date}T${time}+08:00`;
    const parsedImgArray = [];

    const trafficData = this.httpService.get(url).pipe(
      map((response) => {
        const imgArray = response.data.items[0].cameras.slice(0, 10);
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

  nearestDistance(firstLat: string, firstLon: string, secondLat: string, secondLon: string, unit: string) {
    var firstRadlat = Math.PI * Number(firstLat)/180
    var secondRadlat = Math.PI * Number(secondLat)/180
    var theta = Number(firstLon)-Number(secondLon);
    var radtheta = Math.PI * theta/180
    var distance = Math.sin(firstRadlat) * Math.sin(secondRadlat) + Math.cos(firstRadlat) * Math.cos(secondRadlat) * Math.cos(radtheta);
    if (distance > 1) {
        distance = 1;
    }
    distance = Math.acos(distance)
    distance = distance * 180/Math.PI
    distance = distance * 60 * 1.1515
    if (unit=="K") { distance = distance * 1.609344 }
    if (unit=="N") { distance = distance * 0.8684 }
    return distance
  }

  async getWeather(lat: string, lon: string) {
    const url = `${govtechWeatherBaseUrl}/2-hour-weather-forecast`;
    const weatherData = this.httpService.get(url).pipe(map((res) => {
      const areaList = res.data.area_metadata;
      const forecasts = res.data.items[0].forecasts;
      // assume a big enough number (in km)
      let currDistance = 100;
      let area = {};

      // determine the nearest area from the given lat and lon value
      for (let i=0; i < areaList.length; i++) {
        const calDist = this.nearestDistance(lat, lon, areaList[i].label_location.latitude, areaList[i].label_location.longitude, 'K')
        if (calDist < currDistance) {
          currDistance = calDist;
          area = forecasts[i]
        }
      }
      return area
    }))
    return weatherData;
  }
}
