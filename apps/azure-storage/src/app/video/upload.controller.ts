import { Controller, Query, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import { VideoUploadQuery } from "./dto/headers-upload.dto";
import { VideoService } from "./video.service";

const STORAGE_CONTAINER_NAME = process.env.STORAGE_CONTAINER_NAME ?? 'videos';

@Controller('upload')
export class UploadController {
  constructor(private readonly videoService: VideoService) {}

  async upload(@Query() query: VideoUploadQuery, @Req() req: Request, @Res() res: Response) {
    const videoId = query.id;
    const contentType = req.headers['content-type'];

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