import { Module } from '@nestjs/common';
import { ViewedService } from './viewed.service';
import { ViewedController } from './viewed.controller';

@Module({
  controllers: [ViewedController],
  providers: [ViewedService],
})
export class ViewedModule {}
