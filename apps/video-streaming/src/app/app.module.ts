import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { FlixTubeRmqBrokerModule } from '@flix-tube/rmq-broker';

@Module({
  imports: [VideoModule, FlixTubeRmqBrokerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
