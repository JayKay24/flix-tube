import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './schemas/video.schema';
import { Model } from 'mongoose';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private readonly videoModel: Model<Video>) {}

  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  async findAll() {
    return await this.videoModel.find().exec();
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
