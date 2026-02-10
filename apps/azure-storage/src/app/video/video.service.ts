import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME ?? '';
const STORAGE_ACCESS_KEY = process.env.STORAGE_ACCESS_KEY ?? '';
const STORAGE_CONTAINER_NAME = process.env.STORAGE_CONTAINER_NAME ?? 'videos';

@Injectable()
export class VideoService {
  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  async findAll(videoPath: string) {
    const blobService = this.createBlobService();
    const containerClient = blobService.getContainerClient(STORAGE_CONTAINER_NAME);
    const blobClient = containerClient.getBlobClient(videoPath);
    
    return blobClient;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }

  createBlobService() {
    const sharedKeyCredential = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCESS_KEY);
    const blobService = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, sharedKeyCredential);
    return blobService;
  }
}
