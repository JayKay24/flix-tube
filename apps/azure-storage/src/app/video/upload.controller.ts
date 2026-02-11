import { Controller, Post, Param, Req, Res, Headers, ValidationPipe } from "@nestjs/common";
import type { Request, Response } from "express";
import { VideoService } from "./video.service";
import { GetVideoParams } from "./dto/params-video.dto";

const STORAGE_CONTAINER_NAME = process.env.STORAGE_CONTAINER_NAME ?? 'videos';

@Controller('upload')
export class UploadController {
  constructor(private readonly videoService: VideoService) {}

  @Post(':id')
  async upload(
    @Param(new ValidationPipe()) params: GetVideoParams, 
    @Req() req: Request, 
    @Res() res: Response, 
    @Headers('content-type') contentType: string
  ) {
    const videoId = params.id;

    const blobService = this.videoService.createBlobService();
    const containerClient = blobService.getContainerClient(STORAGE_CONTAINER_NAME);

    await containerClient.createIfNotExists();

    const blockBlobClient = containerClient.getBlockBlobClient(videoId);
    await blockBlobClient.uploadStream(req);
    await blockBlobClient.setHTTPHeaders({
      blobContentType: contentType,
    });
    res.sendStatus(200);
  }
}