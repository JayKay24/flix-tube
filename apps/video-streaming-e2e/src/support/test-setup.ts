/* eslint-disable */
import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.TEST_VSTREAM_HOST ?? 'localhost';
  const port = process.env.TEST_VSTREAM_PORT ? Number(process.env.TEST_VSTREAM_PORT) : 4002;
  axios.defaults.baseURL = `http://${host}:${port}`;
  console.log("video-streaming microservice Axios Base URL: ", axios.defaults.baseURL);
};
