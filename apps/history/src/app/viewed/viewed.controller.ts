import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ViewedService } from './viewed.service';
import { UpdateViewedDto } from './dto/update-viewed.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ExchangeType, IViewed } from '@flix-tube/rmq-broker';

@Controller('viewed')
export class ViewedController {
  constructor(private readonly viewedService: ViewedService) {}

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

  @EventPattern(ExchangeType.VIEWED)
  async handleMessage(@Payload() msg: string) {
    const parsedMsg = JSON.parse(msg) as IViewed;
    await this.viewedService.create(parsedMsg);
  }
}
