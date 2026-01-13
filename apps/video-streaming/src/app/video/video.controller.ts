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

const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST ?? '';
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT ?? '') ?? 80;

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const forwardRequest = http.request({
      host: VIDEO_STORAGE_HOST,
      port: VIDEO_STORAGE_PORT,
      path: '/video?path=SampleVideo_1280x720_1mb.mp4',
      method: 'GET',
      headers: req.headers
    }, (forwardResponse) => {
      res.writeHead(forwardResponse.statusCode as number, forwardResponse.headers);
      forwardResponse.pipe(res);
    });
    
    req.pipe(forwardRequest);
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
