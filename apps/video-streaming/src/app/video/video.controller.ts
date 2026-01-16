import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import http from 'http';
import mongoose from 'mongoose';
import axios from 'axios';

const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST ?? '';

if (!process.env.VIDEO_STORAGE_PORT) {
  throw new Error('VIDEO_STORAGE_PORT is not defined');
}

const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  async sendViewedMessage(videoPath: string) {
    return await axios.post('http://history/viewed', {
      videoPath
    });
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const videoId = new mongoose.Types.ObjectId(req.query.id as string);
    const videoRecord = await this.videoService.findById(videoId);
    if (!videoRecord) {
      res.sendStatus(404);
      return;
    }

    const forwardRequest = http.request({
      host: VIDEO_STORAGE_HOST,
      port: VIDEO_STORAGE_PORT,
      path: `/video?path=${videoRecord.videoPath}`,
      method: 'GET',
      headers: req.headers
    }, (forwardResponse) => {
      res.writeHead(forwardResponse.statusCode as number, forwardResponse.headers);
      forwardResponse.pipe(res);
    });
    
    req.pipe(forwardRequest);

    this.sendViewedMessage(videoRecord.videoPath);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
