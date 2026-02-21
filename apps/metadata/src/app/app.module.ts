import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { MongooseModule } from '@nestjs/mongoose';

const METADATA_DBHOST = process.env.METADATA_DBHOST ?? '';
const METADATA_DBNAME = process.env.METADATA_DBNAME ?? '';

@Module({
  imports: [MongooseModule.forRoot(`${METADATA_DBHOST}/${METADATA_DBNAME}`), VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
