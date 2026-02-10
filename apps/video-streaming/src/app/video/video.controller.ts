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
  Query,
  ValidationPipe,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import http from 'http';
import mongoose from 'mongoose';
import { ExchangeType, IViewed, ProducerService } from '@flix-tube/rmq-broker';
import { QueryVideo } from './dto/query-video.dto';

const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST ?? '';

if (!process.env.VIDEO_STORAGE_PORT) {
  throw new Error('VIDEO_STORAGE_PORT is not defined');
}

const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);

@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly producerService: ProducerService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Get()
  async findAll(@Query(new ValidationPipe()) query: QueryVideo, @Req() req: Request, @Res() res: Response) {
    if (!req.query.id) {
      res.status(400).send("Video ID is required");
      return;
    }
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

    this.sendViewedMessage(ExchangeType.VIEWED, videoId);
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

   sendViewedMessage(messageChannel: ExchangeType, videoId: mongoose.Types.ObjectId): void {
    const msg: IViewed = { videoId: videoId.toHexString() };
    const jsonMsg = JSON.stringify(msg);
    this.producerService.sendMessage(messageChannel, jsonMsg);
  }
}
