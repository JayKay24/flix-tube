/* eslint-disable */
import axios from 'axios';

const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
if (!VIDEO_STORAGE_HOST) {
  console.error("VIDEO_STORAGE_HOST is not defined");
  process.exit(1);
}

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL = VIDEO_STORAGE_HOST;
};
