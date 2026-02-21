import { Controller, Get, Param, Post, Res, ValidationPipe } from "@nestjs/common";
import { GetVideoParams } from "./dto/params-video.dto";
import path from "node:path";
import type { Response } from 'express';

const storagePath = path.join(__dirname, "../storage");

@Controller("video")
export class VideoController {
  @Get(":id")
  findOne(@Param(new ValidationPipe()) params: GetVideoParams, @Res() res: Response) {
    const videoId = params.id;
    const localFilePath = path.join(storagePath, videoId);
    res.sendFile(localFilePath);
  }
}