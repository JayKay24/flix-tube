import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FlixTubeDynamicDbModule } from '@flix-tube/dynamic-db';

const DB_FIXTURES_HOST = process.env.DB_FIXTURES_HOST ?? '';

@Module({
  imports: [MongooseModule.forRoot(DB_FIXTURES_HOST), FlixTubeDynamicDbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
