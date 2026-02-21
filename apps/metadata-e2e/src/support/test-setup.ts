/* eslint-disable */
import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.TEST_METADATA_HOST ?? 'localhost';
  const port = process.env.TEST_METADATA_PORT ? Number(process.env.TEST_METADATA_PORT) : 4004;
  axios.defaults.baseURL = `http://${host}:${port}`;
  console.log("metadata microservice Axios Base URL: ", axios.defaults.baseURL);
};
