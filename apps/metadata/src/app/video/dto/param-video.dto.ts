import { IsMongoId } from 'class-validator';

export class GetVideoParam {
  @IsMongoId()
  id!: string;
}