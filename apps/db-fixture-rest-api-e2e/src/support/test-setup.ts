/* eslint-disable */
import axios from 'axios';

const DB_FIXTURES_HOST = process.env.DB_FIXTURES_HOST;
if (!DB_FIXTURES_HOST) {
  console.error("DB_FIXTURES_HOST is not defined");
  process.exit(1);
}

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL = DB_FIXTURES_HOST;
};
