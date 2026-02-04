import { killPort } from '@nx/node/utils';
/* eslint-disable */

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  const port = process.env.TEST_VSTREAM_PORT ? Number(process.env.TEST_VSTREAM_PORT) : 4002;
  await killPort(port);
  console.log(globalThis.__TEARDOWN_MESSAGE__);
};
