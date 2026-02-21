import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Video } from './schemas/video.schema';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private readonly videoModel: Model<Video>) {}

  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  findAll() {
    return 'This action returns all videos';
  }

  async findById(id: mongoose.Types.ObjectId) {
    const videoRecord = await this.videoModel.findById(id).exec();
    return videoRecord;
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
