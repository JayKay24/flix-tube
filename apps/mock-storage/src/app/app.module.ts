import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoController } from './video.controller';
import { UploadController } from './upload.controller';

@Module({
  imports: [],
  controllers: [AppController, VideoController, UploadController],
  providers: [AppService],
})
export class AppModule {}
