/* eslint-disable */
import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.TEST_HIST_HOST ?? 'localhost';
  const port = process.env.TEST_HIST_PORT ? Number(process.env.TEST_HIST_PORT) : 4003;
  axios.defaults.baseURL = `http://${host}:${port}`;
  console.log("history microservice Axios Base URL: ", axios.defaults.baseURL);
};
