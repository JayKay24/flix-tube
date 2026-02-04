import { Matches } from 'class-validator';

export class QueryVideo {
  @Matches(/.*mp4/g)
  path!: string;
}
