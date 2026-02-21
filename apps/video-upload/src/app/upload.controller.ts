import { Controller, Post, Req, Res, Headers } from "@nestjs/common";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import axios from "axios";
import { ExchangeType, IVideoUploaded, ProducerService } from "@flix-tube/rmq-broker";

const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST ?? "";

@Controller("upload")
export class UploadController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  async upload(
    @Req() req: Request, 
    @Res() res: Response, 
    @Headers('file-name') fileName: string,
    @Headers('content-type') contentType: string
  ) {
    const videoId = new mongoose.Types.ObjectId();
    try {
      const { data } = await axios<IVideoUploaded>({
        method: "POST",
        url:`http://${VIDEO_STORAGE_HOST}/upload/${videoId.toHexString()}`,
        data: req,
        headers: {
          "content-type": contentType,
        }
      });
      console.log("Data: ", data, "Content-Type: ", contentType, "File-Name: ", fileName);
      res.status(200).json({ ...data });

      this.broadCastVideoUploadedMessage(ExchangeType.VIDEO_UPLOADED, videoId, fileName, data.url);
    } catch (error) {
      console.log("Error: ", error);
      res.sendStatus(500);
    }
    
  }

  broadCastVideoUploadedMessage(messageChannel: ExchangeType, videoId: mongoose.Types.ObjectId, fileName: string, url?: string) {
    const msg: IVideoUploaded = {
      id: videoId.toHexString(),
      name: fileName,
      url: url ?? ''
    };
    const jsonMsg = JSON.stringify(msg);
    this.producerService.sendMessage(messageChannel, jsonMsg);
    console.log("After broadcast");
  }
}