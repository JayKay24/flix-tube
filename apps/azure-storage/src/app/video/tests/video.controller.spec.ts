import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from '../video.controller';
import { VideoService } from '../video.service';
import { Response } from 'express';

describe('VideoController', () => {
  let controller: VideoController;
  let videoService: VideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [
        {
          provide: VideoService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VideoController>(VideoController);
    videoService = module.get<VideoService>(VideoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should stream a video when a valid id is provided', async () => {
      const videoId = 'some_id';
      const mockContentLength = 12345;
      const mockStream = { pipe: jest.fn() };

      const mockBlobClient = {
        getProperties: jest.fn().mockResolvedValue({
          contentLength: mockContentLength,
        }),
        download: jest.fn().mockResolvedValue({
          readableStreamBody: mockStream,
        }),
      };

      (videoService.findOne as jest.Mock).mockResolvedValue(mockBlobClient);

      const res = {
        writeHead: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.findOne({ id: videoId }, res);

      expect(videoService.findOne).toHaveBeenCalledWith(videoId);
      expect(mockBlobClient.getProperties).toHaveBeenCalled();
      expect(mockBlobClient.download).toHaveBeenCalled();
      expect(res.writeHead).toHaveBeenCalledWith(200, {
        'Content-Length': mockContentLength,
        'Content-Type': 'video/mp4',
      });
      expect(mockStream.pipe).toHaveBeenCalledWith(res);
    });
  });
});
