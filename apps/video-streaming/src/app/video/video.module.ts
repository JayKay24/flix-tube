import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { FlixTubeRmqBrokerModule } from '@flix-tube/rmq-broker';

@Module({
  imports: [FlixTubeRmqBrokerModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
