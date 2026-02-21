import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Module({
  controllers: [],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class FlixTubeRmqBrokerModule {}
