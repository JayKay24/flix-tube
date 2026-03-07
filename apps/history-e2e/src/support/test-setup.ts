/* eslint-disable */
import axios from 'axios';

const HISTORY_HOST = process.env.HISTORY_HOST;
if (!HISTORY_HOST) {
  console.error("HISTORY_HOST is not defined");
  process.exit(1);
}

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL = HISTORY_HOST;
};
