import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { MongooseModule } from '@nestjs/mongoose';

const DBHOST = process.env.DBHOST ?? '';
const DBNAME = process.env.DBNAME ?? '';

@Module({
  imports: [MongooseModule.forRoot(`${DBHOST}/${DBNAME}`), VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
