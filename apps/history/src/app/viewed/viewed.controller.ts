import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ViewedService } from './viewed.service';
import { CreateViewedDto } from './dto/create-viewed.dto';
import { UpdateViewedDto } from './dto/update-viewed.dto';

@Controller('viewed')
export class ViewedController {
  constructor(private readonly viewedService: ViewedService) {}

  @Post()
  create(@Body() createViewedDto: CreateViewedDto) {
    return this.viewedService.create(createViewedDto);
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
