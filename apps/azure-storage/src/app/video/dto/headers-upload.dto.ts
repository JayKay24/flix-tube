import { IsMongoId } from "class-validator";

export class VideoUploadQuery {
  @IsMongoId()
  id!: string;
}