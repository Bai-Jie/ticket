import config from "./config";

const configs = ['useMemoryDataSource', 'mysqlHost', 'mysqlPort', 'mysqlUser', 'mysqlPassword', 'mysqlDatabase'];
let originValue = null;

beforeEach(() => {
  //## 备份原来的环境变量配置
  originValue = {};
  configs.forEach(key => originValue[key] = process.env[key]);

  //## 清空相关环境变量
  // configs.forEach(key => process.env[key] = undefined);
  configs.forEach(key => delete process.env[key]);
});

afterEach(() => {
  //## 恢复原来的环境变量配置
  configs.forEach(key => process.env[key] = originValue[key]);
  originValue = null;
});

test('什么都没配置时报错', () => {
  expect(() => console.log(config.dataSource)).toThrow();
});

test('可以用内存数据存储', () => {
  process.env.useMemoryDataSource = 'true';
  console.log(config.dataSource);
  expect(config.dataSource).toMatchObject({useMemoryDataSource: true});
});

test('正常情况', () => {
  process.env.mysqlHost = 'localhost';
  process.env.mysqlPort = '3306';
  process.env.mysqlUser = 'sampleUser';
  process.env.mysqlPassword = 'samplePassword';
  process.env.mysqlDatabase = 'sampleDatabase';

  console.log(config.dataSource);
  expect(config.dataSource).toMatchObject({
    useMemoryDataSource: false,
    mysql: {
      host: 'localhost',
      port: 3306,
      user: 'sampleUser',
      password: 'samplePassword',
      database: 'sampleDatabase'
    }
  });
});
