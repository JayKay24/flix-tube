import { Test, TestingModule } from '@nestjs/testing';
import { ViewedService } from '../viewed.service';
import { getModelToken } from '@nestjs/mongoose';
import { Viewed } from '../schemas/viewed.schema';

describe('ViewedService', () => {
  let service: ViewedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViewedService,
        {
          provide: getModelToken(Viewed.name),
          useValue: {
            create: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<ViewedService>(ViewedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
