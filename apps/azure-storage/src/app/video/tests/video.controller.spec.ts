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
            findAll: jest.fn(),
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

  describe('findAll', () => {
    it('should stream a video when a valid path is provided', async () => {
      const videoPath = 'some/video.mp4';
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

      (videoService.findAll as jest.Mock).mockResolvedValue(mockBlobClient);

      const res = {
        writeHead: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.findAll({ path: videoPath }, {} as any, res);

      expect(videoService.findAll).toHaveBeenCalledWith(videoPath);
      expect(mockBlobClient.getProperties).toHaveBeenCalled();
      expect(mockBlobClient.download).toHaveBeenCalled();
      expect(res.writeHead).toHaveBeenCalledWith(200, {
        'Content-Length': mockContentLength,
        'Content-Type': 'video/mp4',
      });
      expect(mockStream.pipe).toHaveBeenCalledWith(res);
    });

    it('should return a 400 error if no video path is provided', async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await controller.findAll({ path: '' }, {} as any, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('A video path must be provided.');
    });
  });
});
