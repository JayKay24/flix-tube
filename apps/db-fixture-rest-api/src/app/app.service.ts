import { Injectable } from '@nestjs/common';
import Fixtures from 'node-mongodb-fixtures';
import path from 'path';
import globby from 'globby';
import * as fs from 'fs';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

const fixturesDirectory = process.env.FIXTURES_DIR || 'fixtures';
const databaseHost = process.env.DB_FIXTURES_HOST || 'mongodb://localhost:27017';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async loadFixture(databaseName: string, fixtureName: string) {
    const fixturePath = path.join(fixturesDirectory, fixtureName);
    let dir = fixturePath;
    let filter;

    if (fs.existsSync(fixturePath) && fs.statSync(fixturePath).isFile()) {
      dir = path.dirname(fixturePath);
      filter = path.basename(fixturePath);
    }

    const fixtures = new Fixtures({
      dir,
      filter,
      mute: false
    });

    await fixtures.connect(`${databaseHost}/${databaseName}`);
    await fixtures.unload();
    await fixtures.load();
    await fixtures.disconnect();
  }

  async unloadFixture(databaseName: string, fixtureName: string) {
    const fixturePath = path.join(fixturesDirectory, fixtureName);
    let dir = fixturePath;
    let filter;

    if (fs.existsSync(fixturePath) && fs.statSync(fixturePath).isFile()) {
      dir = path.dirname(fixturePath);
      filter = path.basename(fixturePath);
    }

    const fixtures = new Fixtures({
      dir,
      filter,
      mute: false
    });

    await fixtures.connect(`${databaseHost}/${databaseName}`);
    await fixtures.unload();
    await fixtures.disconnect();
  }

  async getFixturesDirs() {
    const fixtureFilePaths = await globby.globby([fixturesDirectory + "/**/*.js", fixturesDirectory + "/**/*.json"]);
    console.log("Fixture File Paths: ", fixtureFilePaths);
    return fixtureFilePaths.map((fixtureFilePath) => path.basename(path.dirname(fixtureFilePath)));
  }

  async checkReadiness(): Promise<boolean> {
    // Check MongoDB connection (1 = connected)
    const isMongoReady = this.connection.readyState === 1;

    return isMongoReady;
  }
}
