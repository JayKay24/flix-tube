import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { stat } from 'node:fs/promises';

@Injectable()
export class VideoService {
  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  async findAll() {
    const videoPath = "./assets/videos/SampleVideo_1280x720_1mb.mp4";
    const stats = await stat(videoPath);
    return { stats, videoPath };
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
}
