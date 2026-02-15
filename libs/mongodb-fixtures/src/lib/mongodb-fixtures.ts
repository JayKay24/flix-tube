import axios from 'axios';

const dbFixturesURL = 'http://localhost:9000';

async function loadFixture(databaseName: string, fixtureName: string) {
  await unloadFixture(databaseName, fixtureName);
  const url = new URL(`${dbFixturesURL}/load-fixture`);
  url.searchParams.append('db', databaseName);
  url.searchParams.append('fixture', fixtureName);

  await axios.get(url.href);
}

async function unloadFixture(databaseName: string, fixtureName: string) {
  const url = new URL(`${dbFixturesURL}/unload-fixture`);
  url.searchParams.append('db', databaseName);
  url.searchParams.append('fixture', fixtureName);

  await axios.get(url.href);
}

async function dropDatabase(databaseName: string) {
  const url = new URL(`${dbFixturesURL}/drop-database`);
  url.searchParams.append('db', databaseName);

  await axios.get(url.href);
}

async function dropCollection(databaseName: string, collectionName: string) {
  const url = new URL(`${dbFixturesURL}/drop-collection`);
  url.searchParams.append('db', databaseName);
  url.searchParams.append('collection', collectionName);

  await axios.get(url.href);
}

async function getCollection<T>(databaseName: string, collectionName: string): Promise<T> {
  const url = new URL(`${dbFixturesURL}/get-collection`);
  url.searchParams.append('db', databaseName);
  url.searchParams.append('collection', collectionName);

  const response = await axios.get<T>(url.href);
  return response.data;
}

export { loadFixture, unloadFixture, dropDatabase, dropCollection, getCollection };
