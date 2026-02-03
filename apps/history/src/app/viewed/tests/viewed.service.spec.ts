import { Test, TestingModule } from '@nestjs/testing';
import { ViewedService } from '../viewed.service';

describe('ViewedService', () => {
  let service: ViewedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewedService],
    }).compile();

    service = module.get<ViewedService>(ViewedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
