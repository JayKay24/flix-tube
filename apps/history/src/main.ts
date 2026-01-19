/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { rabbitMQConfig } from '@flix-tube/rmq-broker';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  if (!port) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
  }

  app.connectMicroservice(rabbitMQConfig());

  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 history microservice is running on: http://localhost:${port}`
  );
}

bootstrap();
