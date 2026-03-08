import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ProducerService } from '@flix-tube/rmq-broker';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private connection: Connection,
    private readonly producerService: ProducerService,
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async checkReadiness(): Promise<boolean> {
    // Check MongoDB connection (1 = connected)
    const isMongoReady = this.connection.readyState === 1;
    const isRabbitReady = await this.producerService.isReady();

    return isMongoReady && isRabbitReady;
  }
}
