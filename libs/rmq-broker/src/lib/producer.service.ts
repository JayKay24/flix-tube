import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { rabbitMQConfig } from './rmq-broker-config.options';
import { ExchangeType } from './exchanges-types'; // Added this import

@Injectable()
export class ProducerService implements OnModuleDestroy {
  private clients: Map<ExchangeType, ClientProxy> = new Map();

  async onModuleDestroy() {
    for (const client of this.clients.values()) {
      await client.close();
    }
  }

  private getClient(exchange: ExchangeType): ClientProxy {
    if (!this.clients.has(exchange)) {
      const client = ClientProxyFactory.create(rabbitMQConfig(exchange));
      this.clients.set(exchange, client);
      // Connect the client once.
      client.connect(); // Client needs to be connected to start consuming/publishing
    }
    return this.clients.get(exchange) as ClientProxy;
  }

  sendMessage(exchange: ExchangeType, data: string): void {
    const client = this.getClient(exchange);
    client.emit(exchange, data);
  }
}
