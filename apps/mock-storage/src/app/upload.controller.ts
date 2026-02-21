import { Controller, Param, Post, Req, Res, ValidationPipe, Headers } from "@nestjs/common";
import { GetVideoParams } from "./dto/params-video.dto";
import type { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs";

const storagePath = path.join(__dirname, "../storage");

@Controller("upload")
export class UploadController {
  @Post(":id")
  upload(
    @Param(new ValidationPipe()) params: GetVideoParams, 
    @Req() req: Request,
    @Res() res: Response, 
    @Headers('content-type') contentType: string
  ) {
    console.log("Content-Type: ", contentType);
    const videoId = params.id;
    const localFilePath = path.join(storagePath, videoId);
    
    // Ensure the storage directory exists
    fs.mkdirSync(storagePath, { recursive: true });

    const fileWriteStream = fs.createWriteStream(localFilePath);
    req.pipe(fileWriteStream)
      .on('error', (err) => {
        console.error("Upload failed.");
        console.error(err);
        res.sendStatus(500);
      })
      .on('finish', () => {
        console.log("Upload finished.");
        const processedFilePath = localFilePath.replace(/\/app/, process.env.ABSOLUTE_PROJECT_PATH ?? '')
        res.status(200).json({ url: processedFilePath });
      });
  }
}