import { Transport, RmqOptions } from '@nestjs/microservices';
import { ExchangeType } from './exchanges-types';

const RABBIT = process.env.RABBIT ?? '';

export const rabbitMQConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [RABBIT],
    exchange: ExchangeType.VIEWED,
    exchangeType: 'fanout',
    queueOptions: {
      durable: true
    }
  }
});
