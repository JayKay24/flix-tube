import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ViewedService } from './viewed.service';
import { CreateViewedDto } from './dto/create-viewed.dto';
import { UpdateViewedDto } from './dto/update-viewed.dto';
import type { Response } from 'express';

@Controller('viewed')
export class ViewedController {
  constructor(private readonly viewedService: ViewedService) {}

  @Post()
  async create(
    @Body() createViewedDto: CreateViewedDto,
    @Res() res: Response,
  ) {
    await this.viewedService.create(createViewedDto.videoPath);

    res.sendStatus(201);
  }

  @Get()
  findAll() {
    return this.viewedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViewedDto: UpdateViewedDto) {
    return this.viewedService.update(+id, updateViewedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewedService.remove(+id);
  }
}
