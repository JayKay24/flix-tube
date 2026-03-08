import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('ready')
  async ready(@Res() res: Response) {
    const isReady = await this.appService.checkReadiness();
    if (isReady) {
      res.status(200).send('OK');
    } else {
      res.status(500).send('Not Ready');
    }
  }

  @Get('alive')
  alive(@Res() res: Response) {
    res.status(200).send('OK');
  }
}
