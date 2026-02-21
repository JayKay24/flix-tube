import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';
import { FlixTubeRmqBrokerModule } from '@flix-tube/rmq-broker';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    FlixTubeRmqBrokerModule
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
