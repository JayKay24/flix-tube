/* eslint-disable */
import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.TEST_VSTOR_HOST ?? 'localhost';
  const port = process.env.TEST_VSTOR_PORT ? Number(process.env.TEST_VSTOR_PORT) : 4001;
  axios.defaults.baseURL = `http://${host}:${port}`;
  console.log("video-storage microservice Axios Base URL: ", axios.defaults.baseURL);
};
