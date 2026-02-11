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
  ValidationPipe,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import mongoose from 'mongoose';
import { ExchangeType, IViewed, ProducerService } from '@flix-tube/rmq-broker';
import { GetVideoParams } from './dto/params-video.dto';
import axios from "axios";

const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST ?? '';

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
  async findAll(@Param(new ValidationPipe()) params: GetVideoParams, @Req() req: Request, @Res() res: Response) {
    const videoId = new mongoose.Types.ObjectId(params.id);
    const response = await axios({
      method: 'GET',
      url: `http://${VIDEO_STORAGE_HOST}/video/${videoId}`,
      responseType: 'stream',
      data: req
    });
    response.data.pipe(res);

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
