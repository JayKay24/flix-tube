import { Transport, RmqOptions } from '@nestjs/microservices';

const RABBIT = process.env.RABBIT ?? '';

export const rabbitMQConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [RABBIT],
    exchange: 'viewed',
    exchangeType: 'fanout',
    queueOptions: {
      durable: true
    }
  }
});
