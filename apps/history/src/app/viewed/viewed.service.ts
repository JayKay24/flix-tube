import { Injectable } from '@nestjs/common';
import { CreateViewedDto } from './dto/create-viewed.dto';
import { UpdateViewedDto } from './dto/update-viewed.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Viewed } from './schemas/viewed.schema';
import { Model } from 'mongoose';

@Injectable()
export class ViewedService {
  constructor(@InjectModel(Viewed.name) private readonly viewedModel: Model<Viewed>) {}

  create(createViewedDto: CreateViewedDto) {
    return 'This action adds a new viewed';
  }

  findAll() {
    return `This action returns all viewed`;
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
