import { Injectable } from '@nestjs/common';
import { UpdateViewedDto } from './dto/update-viewed.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Viewed } from './schemas/viewed.schema';
import mongoose, { Model } from 'mongoose';
import { IViewed } from '@flix-tube/rmq-broker';

@Injectable()
export class ViewedService {
  constructor(@InjectModel(Viewed.name) private readonly viewedModel: Model<Viewed>) {}

  async create(viewed: IViewed) {
    await this.viewedModel.create({ videoId: viewed.videoId });
  }

  async findAll() {
    return await this.viewedModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} viewed`;
  }

  update(id: number, updateViewedDto: UpdateViewedDto) {
    return `This action updates a #${id} viewed`;
  }

  remove(id: number) {
    return `This action removes a #${id} viewed`;
  }
}
