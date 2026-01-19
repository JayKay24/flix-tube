import { Module } from '@nestjs/common';
import { ViewedService } from './viewed.service';
import { ViewedController } from './viewed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Viewed, ViewedSchema } from './schemas/viewed.schema';
import { FlixTubeRmqBrokerModule } from '@flix-tube/rmq-broker';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Viewed.name, schema: ViewedSchema }]),
    FlixTubeRmqBrokerModule
  ],
  controllers: [ViewedController],
  providers: [ViewedService],
})
export class ViewedModule {}
