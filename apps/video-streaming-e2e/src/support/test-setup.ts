/* eslint-disable */
import axios from 'axios';

const VIDEO_STREAMING_HOST = process.env.VIDEO_STREAMING_HOST;
if (!VIDEO_STREAMING_HOST) {
  console.error("VIDEO_STREAMING_HOST is not defined");
  process.exit(1);
}

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL = VIDEO_STREAMING_HOST;
};
