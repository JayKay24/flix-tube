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
    @Headers('file-name') fileName: string
  ) {
    const videoId = new mongoose.Types.ObjectId();
    const response = await axios({
      method: "POST",
      url:`${VIDEO_STORAGE_HOST}/upload/${videoId.toHexString()}`,
      data: req,
      responseType: "stream",
      headers: {
        "content-type": req.headers["content-type"],
      }
    });
    response.data.pipe(res);

    this.broadCastVideoUploadedMessage(ExchangeType.VIDEO_UPLOADED, videoId, fileName);
  }

  broadCastVideoUploadedMessage(messageChannel: ExchangeType, videoId: mongoose.Types.ObjectId, fileName: string) {
    const msg: IVideoUploaded = {
      id: videoId.toHexString(),
      name: fileName
    };
    const jsonMsg = JSON.stringify(msg);
    this.producerService.sendMessage(messageChannel, jsonMsg);
  }
}