import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoService {
  findAll() {
    return 'This action returns all videos';
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
