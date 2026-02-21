import { IsNotEmpty } from 'class-validator';

export class DbFixtureQuery {
  @IsNotEmpty({
    message: 'Database name is required',
  })
  db!: string;

  @IsNotEmpty({
    message: 'Fixture name is required',
  })
  fixture!: string;
}

export class GetCollectionQuery {
  @IsNotEmpty({
    message: 'Database name is required',
  })
  db!: string;

  @IsNotEmpty({
    message: 'Collection name is required',
  })
  collection!: string;
}

export class DropCollectionQuery extends GetCollectionQuery {}

export class DropDatabaseQuery {
  @IsNotEmpty({
    message: 'Database name is required',
  })
  db!: string;
}
