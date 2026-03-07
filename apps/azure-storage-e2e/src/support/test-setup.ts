/* eslint-disable */
import axios from 'axios';

const AZURE_STORAGE_HOST = process.env.AZURE_STORAGE_HOST;
if (!AZURE_STORAGE_HOST) {
  console.error("AZURE_STORAGE_HOST is not defined");
  process.exit(1);
}

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL = AZURE_STORAGE_HOST;
};
