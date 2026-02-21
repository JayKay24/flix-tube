import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection, Document, Model, Schema } from 'mongoose';

@Injectable()
export class FlixTubeDynamicDbService {
  constructor(@InjectConnection() private connection: Connection) {}

  getDynamicModel<T>(dbName: string, collectionName: string, schema: Schema<T>): Model<T> {
    const dynamicDbConnection = this.connection.useDb(dbName);
    if (!dynamicDbConnection.models[collectionName]) {
      return dynamicDbConnection.model<T>(collectionName, schema);
    }
    return dynamicDbConnection.models[collectionName] as Model<T>;
  }

  async collectionExists(dbName: string, collectionName: string): Promise<boolean> {
    const dynamicDbConnection = this.connection.useDb(dbName);
    try {
      const collections = await dynamicDbConnection.db?.listCollections({ name: collectionName }).toArray();
      if (collections) {
        return collections.length > 0;
      }
      return false;
    } catch (error) {
      console.error(`Error checking collection existence: ${error}`);
      return false;
    }
  }

  async getCollection(dbName: string, collectionName: string): Promise<Document<any>[] | any[]> {
    const collectionALreadyExists = await this.collectionExists(dbName, collectionName);
    if (collectionALreadyExists) {
      const dynamicDbConnection = this.connection.useDb(dbName);
      return await dynamicDbConnection.collection(collectionName).find().toArray()
    } else {
      console.log("Collection does not exist. Skipping get: " + collectionName);
      return [];
    }
  }

  async dropCollection(dbName: string, collectionName: string): Promise<void> {
    const collectionALreadyExists = await this.collectionExists(dbName, collectionName);
    if (collectionALreadyExists) {
      const dynamicDbConnection = this.connection.useDb(dbName);
      await dynamicDbConnection.collection(collectionName).drop();
    } else {
      console.log("Collection does not exist. Skipping drop: " + collectionName);
    }
  }

  async dropDatabase(dbName: string): Promise<void> {
    const dynamicDbConnection = this.connection.useDb(dbName);
    await dynamicDbConnection.dropDatabase();
  }
}
