import { Module } from '@nestjs/common';
import { ViewedService } from './viewed.service';
import { ViewedController } from './viewed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Viewed, ViewedSchema } from './schemas/viewed.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Viewed.name, schema: ViewedSchema }])],
  controllers: [ViewedController],
  providers: [ViewedService],
})
export class ViewedModule {}
