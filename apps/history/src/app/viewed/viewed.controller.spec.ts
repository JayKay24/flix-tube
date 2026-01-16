import { Test, TestingModule } from '@nestjs/testing';
import { ViewedController } from './viewed.controller';
import { ViewedService } from './viewed.service';

describe('ViewedController', () => {
  let controller: ViewedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewedController],
      providers: [ViewedService],
    }).compile();

    controller = module.get<ViewedController>(ViewedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
