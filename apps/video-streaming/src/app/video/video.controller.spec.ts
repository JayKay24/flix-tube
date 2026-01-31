import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { getModelToken } from '@nestjs/mongoose';
import { Video } from './schemas/video.schema';
import { ProducerService } from '@flix-tube/rmq-broker';

describe('VideoController', () => {
  let controller: VideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [
        VideoService,
        {
          provide: getModelToken(Video.name),
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: ProducerService,
          useValue: {
            sendMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VideoController>(VideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
