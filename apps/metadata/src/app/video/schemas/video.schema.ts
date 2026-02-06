import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
  @Prop()
  name!: string;
  
  @Prop()
  videoPath!: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);