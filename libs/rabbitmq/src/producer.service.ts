import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { rabbitMQConfig } from '.';

@Injectable()
export class ProducerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(rabbitMQConfig());
  }

  async sendMessage(pattern: string, data: any) {
    return this.client.send(pattern, data);
  }
}
