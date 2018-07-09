import {setupSampleData} from "../config-database-mock";
import {connect} from "../config-database";
import {createApp, createObjects} from "../app";

const commandServer = {
  command: 'server',
  aliases: ['*'], // Default Command
  describe: '正常 Server。连接 MySQL 数据库等。请在环境变量指定 MySQL 数据库配置',
  handler: argv => startServer(argv).catch(console.error)
};

async function startServer(argv) {
  process.env.useMemoryDataSource = 'false';

  await connect();

  const {app} = createObjects();

  app.listen(4000, function () {
    const {port} = this.address();
    console.log(`Now browse to localhost:${port}/graphql`);
  });
}


const commandMockServer = {
  command: 'mock-server',
  describe: '开发和测试用模拟 server。使用内存模拟数据库',
  builder: yargs => yargs.options({
    'sample-data': {
      describe: '使用示例数据。包括示例商铺、示例 banner。可用 --no-sample-data 参数表示不使用',
      default: true,
      type: 'boolean'
    }
  }),
  handler: argv => startMockServer(argv).catch(console.error)
};

async function startMockServer(argv) {
  process.env.useMemoryDataSource = 'true';

  await connect();

  const {app, ticketRepository, eventRepository} = createObjects();

  if (argv.sampleData) {
    await setupSampleData(ticketRepository, eventRepository);
  }

  app.listen(4000, function () {
    const {port} = this.address();
    console.log(`Now browse to localhost:${port}/graphql`);
  });
}

export const commandStart = {
  command: 'start',
  describe: '启动 Server',
  builder: yargs => yargs
    .command(commandServer)
    .command(commandMockServer)
    .demandCommand()
};
