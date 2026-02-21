import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './upload.controller';
import { FlixTubeRmqBrokerModule } from '@flix-tube/rmq-broker';

@Module({
  imports: [FlixTubeRmqBrokerModule],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
