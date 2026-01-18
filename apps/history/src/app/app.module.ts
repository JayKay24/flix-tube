import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ViewedModule } from './viewed/viewed.module';
import { ProducerService } from '@flix-tube/rabbitmq-broker';

const HISTORY_DBNAME = process.env.HISTORY_DBNAME ?? '';
const HISTORY_DBHOST = process.env.HISTORY_DBHOST ?? '';

@Module({
  imports: [
    MongooseModule.forRoot(`${HISTORY_DBHOST}/${HISTORY_DBNAME}`),
    ViewedModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProducerService],
})
export class AppModule {}
