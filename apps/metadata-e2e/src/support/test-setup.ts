/* eslint-disable */
import axios from 'axios';

const METADATA_HOST = process.env.METADATA_HOST;
if (!METADATA_HOST) {
  console.error("METADATA_HOST is not defined");
  process.exit(1);
}

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL = METADATA_HOST;
};
