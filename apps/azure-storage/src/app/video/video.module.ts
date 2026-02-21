import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { UploadController } from './upload.controller';

@Module({
  controllers: [VideoController, UploadController],
  providers: [VideoService],
})
export class VideoModule {}
