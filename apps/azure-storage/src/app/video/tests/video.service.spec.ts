import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from '../video.service';
import { BlobServiceClient } from '@azure/storage-blob';

// Mock the @azure/storage-blob library
jest.mock('@azure/storage-blob', () => {
  const mBlobClient = {
    // Mock any methods on BlobClient that you need
  };
  const mContainerClient = {
    getBlobClient: jest.fn().mockReturnValue(mBlobClient),
  };
  const mBlobServiceClient = {
    getContainerClient: jest.fn().mockReturnValue(mContainerClient),
  };
  return {
    BlobServiceClient: jest.fn().mockReturnValue(mBlobServiceClient),
    StorageSharedKeyCredential: jest.fn(),
  };
});

describe('VideoService', () => {
  let service: VideoService;
  let blobServiceClient: BlobServiceClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoService],
    }).compile();

    service = module.get<VideoService>(VideoService);
    blobServiceClient = new BlobServiceClient(''); // The actual URL doesn't matter because it's mocked
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a blob client for a given video path', async () => {
      const videoPath = 'some/video/path.mp4';
      const containerName = 'videos';

      const blobClient = await service.findAll(videoPath);

      const containerClient = blobServiceClient.getContainerClient(containerName);
      expect(containerClient.getBlobClient).toHaveBeenCalledWith(videoPath);
      expect(blobClient).toBeDefined();
    });
  });
});
