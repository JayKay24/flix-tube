import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from '../video.controller';
import { VideoService } from '../video.service';
import { Response } from 'express';
import { IVideoUploaded, ExchangeType } from '@flix-tube/rmq-broker';
import { GetVideoParam } from '../dto/param-video.dto';

describe('VideoController', () => {
  let controller: VideoController;
  let service: VideoService;

  const mockVideoService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [
        {
          provide: VideoService,
          useValue: mockVideoService,
        },
      ],
    }).compile();

    controller = module.get<VideoController>(VideoController);
    service = module.get<VideoService>(VideoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of videos', async () => {
      const videos = [{ id: '1', name: 'Test Video', url: 'http://example.com/1' }];
      mockVideoService.findAll.mockResolvedValue(videos);

      const mockResponse = {
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.findAll(mockResponse);

      expect(service.findAll).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(videos);
    });
  });

  describe('findOne', () => {
    it('should return a single video if found', async () => {
      const video = { id: '1', name: 'Test Video', url: 'http://example.com/1' };
      mockVideoService.findOne.mockResolvedValue(video);

      const mockResponse = {
        json: jest.fn().mockReturnThis(),
        sendStatus: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const params: GetVideoParam = { id: '1' };
      await controller.findOne(params, mockResponse);

      expect(service.findOne).toHaveBeenCalledWith(params.id);
      expect(mockResponse.json).toHaveBeenCalledWith(video);
      expect(mockResponse.sendStatus).not.toHaveBeenCalled();
    });

    it('should send 404 if video not found', async () => {
      mockVideoService.findOne.mockResolvedValue(null);

      const mockResponse = {
        json: jest.fn().mockReturnThis(),
        sendStatus: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const params: GetVideoParam = { id: '2' };
      await controller.findOne(params, mockResponse);

      expect(service.findOne).toHaveBeenCalledWith(params.id);
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe('handleMessage', () => {
    it('should parse the message and call videoService.create', async () => {
      const videoUploaded: IVideoUploaded = {
        id: 'test-id',
        name: 'test-video',
        url: 'http://test.com/video/test-id',
      };
      const message = JSON.stringify(videoUploaded);

      mockVideoService.create.mockResolvedValue(undefined);

      // Mock console.log to prevent test output pollution
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      await controller.handleMessage(message);

      expect(service.create).toHaveBeenCalledWith(videoUploaded);
      expect(consoleSpy).toHaveBeenCalledWith("Received message: ", message);

      consoleSpy.mockRestore(); // Restore original console.log
    });
  });
});
