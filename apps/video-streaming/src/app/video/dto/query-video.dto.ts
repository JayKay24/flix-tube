import { IsMongoId } from "class-validator";

export class QueryVideo {
  @IsMongoId()
  id!: string;
}
