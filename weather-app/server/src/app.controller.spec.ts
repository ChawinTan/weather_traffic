import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { map, of } from 'rxjs';

const httpService = {
  get: jest.fn().mockImplementation(() => of({ data: {
    items: [{
      cameras: [
        {
          image: 'image',
          location: {
            latitude: 'lat',
            longitude:  'lon'
          }
        }
      ]
    }]
  } })),
  post: jest.fn().mockImplementation(() => of({ data: {} })),
};

describe('AppController', () => {
  let appController: AppController;
  let httpClient: HttpService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: httpService
        }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    httpClient = app.get<HttpService>(HttpService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return traffic data', async () => {
      (await appController.getTrafficImageData({date: 'date', time: 'time'})).subscribe(res => {
        expect(res[0].lat).tobe('lat');
        expect(res[0].lon).tobe('lon');
      })
    })  
  });
});
