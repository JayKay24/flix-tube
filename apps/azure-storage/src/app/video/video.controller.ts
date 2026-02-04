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
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import type { Response, Request, query } from 'express';
import { QueryVideo } from './dto/query-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Get()
  async findAll(@Query(new ValidationPipe()) query: QueryVideo, @Req() req: Request, @Res() res: Response) {
    const videoPath = query.path;
    if (!videoPath) {
      res.status(400).send('A video path must be provided.');
      return;
    }
    const blobClient = await this.videoService.findAll(videoPath);
    
    const properties = await blobClient.getProperties();

    res.writeHead(200, {
      "Content-Length": properties.contentLength,
      "Content-Type": "video/mp4"
    });

    const response = await blobClient.download();
    response.readableStreamBody?.pipe(res);
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
