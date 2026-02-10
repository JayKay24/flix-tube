import { Injectable } from '@nestjs/common';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './schemas/video.schema';
import { Model } from 'mongoose';
import { IVideoUploaded } from '@flix-tube/rmq-broker';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private readonly videoModel: Model<Video>) {}

  async create(uploadedVideo: IVideoUploaded) {
    await this.videoModel.create({ _id: uploadedVideo.id, name: uploadedVideo.name });
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
