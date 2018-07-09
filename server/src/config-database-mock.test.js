// @flow

import {setupSampleData} from "./config-database-mock";
import {connect, disconnect} from "./config-database";

jest.setTimeout(10000); //TODO 改善性能

test('setupSampleData', async () => {
  await connect();

  await setupSampleData();

  await disconnect();
});
