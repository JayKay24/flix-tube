import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ViewedModule } from './viewed/viewed.module';
import { FlixTubeRmqBrokerModule } from '@flix-tube/rmq-broker';

const HISTORY_DBNAME = process.env.HISTORY_DBNAME ?? '';
const HISTORY_DBHOST = process.env.HISTORY_DBHOST ?? '';

@Module({
  imports: [
    MongooseModule.forRoot(`${HISTORY_DBHOST}/${HISTORY_DBNAME}`),
    FlixTubeRmqBrokerModule,
    ViewedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
