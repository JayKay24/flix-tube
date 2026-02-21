// import { killPort } from '@nx/node/utils';
import { execSync } from 'node:child_process';

/* eslint-disable */

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  
  console.log(globalThis.__TEARDOWN_MESSAGE__);
  execSync('source ./dev_utility_functions.sh && down prod history');
};
