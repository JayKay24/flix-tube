/* eslint-disable */
import axios from 'axios';

const VIDEO_UPLOAD_HOST = process.env.VIDEO_UPLOAD_HOST;
if (!VIDEO_UPLOAD_HOST) {
  console.error("VIDEO_UPLOAD_HOST is not defined");
  process.exit(1);
}

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL = VIDEO_UPLOAD_HOST;
};
