/* eslint-disable */
import axios from 'axios';

const MOCK_STORAGE_HOST = process.env.MOCK_STORAGE_HOST;
if (!MOCK_STORAGE_HOST) {
  console.error("MOCK_STORAGE_HOST is not defined");
  process.exit(1);
}

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL = MOCK_STORAGE_HOST;
};
