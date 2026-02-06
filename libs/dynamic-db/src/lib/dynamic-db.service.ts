import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Schema } from 'mongoose';

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
}
