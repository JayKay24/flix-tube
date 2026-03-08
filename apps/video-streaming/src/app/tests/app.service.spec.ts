import { Test } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ProducerService } from '@flix-tube/rmq-broker';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ProducerService,
          useValue: {
            sendMessage: jest.fn(),
            isReady: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
