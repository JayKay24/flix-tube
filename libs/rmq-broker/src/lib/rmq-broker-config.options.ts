import { Transport, RmqOptions } from '@nestjs/microservices';
import { ExchangeType } from './exchanges-types';

const RABBIT = process.env.RABBIT ?? '';

export const rabbitMQConfig = (exchangeName: ExchangeType, exchangeType = 'fanout'): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [RABBIT],
    exchange: exchangeName,
    exchangeType: exchangeType,
    queueOptions: {
      durable: true
    }
  }
});
