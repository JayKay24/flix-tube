import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import type { Response } from 'express';
import { GetVideoParams } from './dto/params-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Get(':id')
  async findOne(@Param(new ValidationPipe()) params: GetVideoParams, @Res() res: Response) {
    const videoId = params.id;

    const blobClient = await this.videoService.findOne(videoId);
    
    const properties = await blobClient.getProperties();

    res.writeHead(200, {
      "Content-Length": properties.contentLength,
      "Content-Type": "video/mp4"
    });

    const response = await blobClient.download();
    response.readableStreamBody?.pipe(res);
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
