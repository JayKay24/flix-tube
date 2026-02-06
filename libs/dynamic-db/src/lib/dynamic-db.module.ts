import { Module } from '@nestjs/common';
import { FlixTubeDynamicDbService } from './dynamic-db.service';

@Module({
  controllers: [],
  providers: [FlixTubeDynamicDbService],
  exports: [FlixTubeDynamicDbService],
})
export class FlixTubeDynamicDbModule {}
