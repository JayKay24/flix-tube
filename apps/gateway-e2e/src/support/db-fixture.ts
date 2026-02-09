import axios from 'axios';

const dbFixturesURL = 'http://localhost:9000';

async function loadFixture(databaseName: string, fixtureName: string) {
  await unloadFixture(databaseName, fixtureName);
  const url = `${dbFixturesURL}/load-fixture?db=${databaseName}&fixture=${fixtureName}`;
  await axios.get(url);
}

async function unloadFixture(databaseName: string, fixtureName: string) {
  const url = `${dbFixturesURL}/unload-fixture?db=${databaseName}&fixture=${fixtureName}`;
  await axios.get(url);
}

async function dropDatabase(databaseName: string) {
  const url = `${dbFixturesURL}/drop-database?db=${databaseName}`;
  await axios.get(url);
}

async function dropCollection(databaseName: string, collectionName: string) {
  const url = `${dbFixturesURL}/drop-collection?db=${databaseName}&collection=${collectionName}`;
  await axios.get(url);
}

async function getCollection<T>(databaseName: string, collectionName: string): Promise<T> {
  const url = `${dbFixturesURL}/get-collection?db=${databaseName}&collection=${collectionName}`;
  const response = await axios.get<T>(url);
  return response.data;
}

export { loadFixture, unloadFixture, dropDatabase, dropCollection, getCollection };
