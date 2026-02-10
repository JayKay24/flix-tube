import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import type { Response } from 'express';
import { VideoService } from './video.service';
import { UpdateVideoDto } from './dto/update-video.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ExchangeType, IVideoUploaded } from '@flix-tube/rmq-broker';
import { GetVideoParam } from './dto/param-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const videos = await this.videoService.findAll();
    
    res.json(videos);
  }

  @Get(':id')
  async findOne(@Param(new ValidationPipe()) params: GetVideoParam, @Res() res: Response) {
    const video = await this.videoService.findOne(params.id);
    if (!video) {
      res.sendStatus(404);
    } else {
      res.json(video);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }

  @EventPattern(ExchangeType.VIDEO_UPLOADED)
  async handleMessage(@Payload() msg: string) {
    const parsedMsg = JSON.parse(msg) as IVideoUploaded;
    await this.videoService.create(parsedMsg);
  }
}
