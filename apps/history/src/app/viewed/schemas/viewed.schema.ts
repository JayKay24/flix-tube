import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ViewedDocument = HydratedDocument<Viewed>;

@Schema()
export class Viewed {
  @Prop()
  name!: string;

  @Prop()
  videoPath!: string;
}

export const ViewedSchema = SchemaFactory.createForClass(Viewed);
