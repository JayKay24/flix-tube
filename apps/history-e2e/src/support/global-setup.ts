import { waitForPortOpen } from '@nx/node/utils';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  const host = process.env.TEST_HIST_HOST ?? 'localhost';
  const port = process.env.TEST_HIST_PORT ? Number(process.env.TEST_HIST_PORT) : 4003;
  const rabbitPort = process.env.RABBIT_PORT ? Number(process.env.RABBIT_PORT) : 5672;
  const mongoDBPort = process.env.MONGODB_PORT ? Number(process.env.MONGODB_PORT) : 4000;

  console.log("Host & port: ", host, port);
  await waitForPortOpen(mongoDBPort);
  await waitForPortOpen(rabbitPort);
  await waitForPortOpen(port, { host });

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
