import { IsMongoId } from "class-validator";

export class GetVideoParams {
  @IsMongoId()
  id!: string;
}
