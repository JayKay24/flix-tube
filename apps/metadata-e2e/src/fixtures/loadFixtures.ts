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

export { loadFixture, unloadFixture };
