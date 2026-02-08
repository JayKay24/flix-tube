import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';
import { 
  DbFixtureQuery, 
  DropCollectionQuery, 
  DropDatabaseQuery, 
  GetCollectionQuery 
} from './dto/query-app.dto';
import { FlixTubeDynamicDbService } from '@flix-tube/dynamic-db';

const fixturesDirectory = process.env.FIXTURES_DIR || 'fixtures';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly dynamicDbService: FlixTubeDynamicDbService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('is-alive')
  isAlive(@Res() res: Response) {
    res.json({
      ok: true
    });
  }

  @Get('load-fixture')
  async loadFixture(@Query() query: DbFixtureQuery, @Res() res: Response) {
    const fixtureName = query.fixture;
    const databaseName = query.db;

    try {
      await this.appService.loadFixture(databaseName, fixtureName);
      console.log(`Loaded database fixture: ${fixtureName} to database: ${databaseName}`);
      res.sendStatus(200);
    } catch (error) {
      const msg = `Failed to load database fixture ${fixtureName} to database ${databaseName}`;
      console.error(msg);
      console.error(error);
      res.status(400).send(msg);
    }
  }

  @Get('unload-fixture')
  async unloadFixture(@Query() query: DbFixtureQuery, @Res() res: Response) {
    const fixtureName = query.fixture;
    const databaseName = query.db;

    try {
      await this.appService.unloadFixture(databaseName, fixtureName);
      console.log(`Unloaded database fixture: ${fixtureName} from database: ${databaseName}`);
      res.sendStatus(200);
    } catch (error) {
      const msg = `Failed to unload database fixture ${fixtureName} from database ${databaseName}`;
      console.error(msg);
      res.status(400).send(msg);
    }
  }

  @Get('drop-collection')
  async dropCollection(@Query() query: DropCollectionQuery, @Res() res: Response) {
    const collectionName = query.collection;
    const databaseName = query.db;

    try {
      await this.dynamicDbService.dropCollection(databaseName, collectionName);
      console.log(`Dropped collection: ${collectionName} from database: ${databaseName}`);
      res.sendStatus(200);
    } catch (error) {
      const msg = `Failed to drop collection ${collectionName} from database ${databaseName}`;
      console.error(msg);
      res.status(400).send(msg);
    }
  }

  @Get('drop-database')
  async dropDatabase(@Query() query: DropDatabaseQuery, @Res() res: Response) {
    const databaseName = query.db;

    try {
      await this.dynamicDbService.dropDatabase(databaseName);
      console.log(`Dropped database: ${databaseName}`);
      res.sendStatus(200);
    } catch (error) {
      const msg = `Failed to drop database ${databaseName}`;
      console.error(msg);
      res.status(400).send(msg);
    }
  }

  @Get('get-collection')
  async getCollection(@Query() query: GetCollectionQuery, @Res() res: Response) {
    const databaseName = query.db;
    const collectionName = query.collection;

    try {
      const collection = await this.dynamicDbService.getCollection(databaseName, collectionName);
      res.json(collection);
      
    } catch (error) {
      const msg = `Failed to get collection ${collectionName} from database ${databaseName}`;
      console.error(msg);
      res.status(400).send(msg);
    }
  }

  @Get('get-fixtures')
  async getFixtures(@Res() res: Response) {
    try {
      const fixtureNames = await this.appService.getFixturesDirs();
      console.log("Fixture Names here: ", fixtureNames);
      console.log("Fixtures Dir: ", fixturesDirectory);
      res.json(fixtureNames);
    } catch (error) {
      const msg = `Failed to list fixtures in directory ${fixturesDirectory}`;
      console.error(msg);
      res.status(500).send(msg);
    }
  }
}
