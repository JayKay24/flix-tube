import { Injectable } from '@nestjs/common';
import { ProducerService } from '@flix-tube/rmq-broker';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async checkReadiness(): Promise<boolean> {
    return await this.producerService.isReady();
  }
}
