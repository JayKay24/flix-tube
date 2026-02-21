import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from '../video.service';
import { getModelToken } from '@nestjs/mongoose';
import { Video } from '../schemas/video.schema';
import mongoose, { Model } from 'mongoose';


describe('VideoService', () => {
  let service: VideoService;
  let videoModel: Model<Video>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: getModelToken(Video.name),
          useValue: {
            // Add mock methods that are used in the service
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VideoService>(VideoService);
    videoModel = module.get<Model<Video>>(getModelToken(Video.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a video record if found', async () => {
    const mockVideoId = new mongoose.Types.ObjectId();
    const mockVideo = {
      _id: mockVideoId,
      name: 'Test Video',
      videoPath: 'path/to/video.mp4',
    } as Video;

    jest
      .spyOn(videoModel, 'findById')
      .mockReturnValue(
        {
          exec: jest.fn()
                    .mockResolvedValue(mockVideo),
        } as any
      );

    const result = await service.findById(mockVideoId);
    expect(result).toEqual(mockVideo);
    expect(videoModel.findById).toHaveBeenCalledWith(mockVideoId);
  });

  it('should return null if no video record is found', async () => {
    const mockVideoId = new mongoose.Types.ObjectId();

    jest.spyOn(videoModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    const result = await service.findById(mockVideoId);
    expect(result).toBeNull();
    expect(videoModel.findById).toHaveBeenCalledWith(mockVideoId);
  });
});
