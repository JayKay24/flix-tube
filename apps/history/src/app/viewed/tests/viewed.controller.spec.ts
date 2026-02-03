import { Test, TestingModule } from '@nestjs/testing';
import { ViewedController } from '../viewed.controller';
import { ViewedService } from '../viewed.service';
import { getModelToken } from '@nestjs/mongoose';
import { Viewed } from '../schemas/viewed.schema';

describe('ViewedController', () => {
  let controller: ViewedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewedController],
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

    controller = module.get<ViewedController>(ViewedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
