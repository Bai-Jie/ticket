// @flow

import mysql from "mysql2/promise";
import mysqlRaw from "mysql2";
import config from "./config";

//TODO 换用这方面更完善的 https://github.com/mysqljs/mysql
//TODO see https://github.com/mysqljs/mysql/commit/5ea649d6d94f1dde7e28dff73d04ec188582a86d
// patch mysql2 的 Pool.getConnection 方法，使用连接前检查连接可用性
const oldPoolGetConnection = mysqlRaw.Pool.prototype.getConnection;
mysqlRaw.Pool.prototype.getConnection = function (callback) {
  const getConnectionFun = () => new Promise((resolve, reject) => {
    oldPoolGetConnection.call(this, (error, connection) => {
      if (error) {
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });

  findAvailableMysqlConnection(getConnectionFun, false)
    .then(connection => callback(null, connection))
    .catch(error => callback(error));
};

let databaseConnection = null;

export async function connect() {
  if (databaseConnection) {
    return;
  }

  if (config.dataSource.useMemoryDataSource) {
    databaseConnection = {};
  } else {
    databaseConnection = mysql.createPool(config.mysqlConnectionConfig);
  }

  setRepositories(databaseConnection);
}

export async function disconnect() {
  if (!databaseConnection) {
    return;
  }

  unsetRepositories();

  if (config.dataSource.useMemoryDataSource) {
    databaseConnection = null;
  } else {
    await databaseConnection.end();
    databaseConnection = null;
  }
}

function setRepositories(databaseConnection) {
}

function unsetRepositories() {
}

function promisifyConnectionExecuteFun(rawMysqlConnection) {
  return (query, params) => new Promise((resolve, reject) => {
    const callback = (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve([rows, fields]);
      }
    };
    if (params) {
      rawMysqlConnection.execute(query, params, callback);
    } else {
      rawMysqlConnection.execute(query, callback);
    }
  });
}

async function checkMysqlConnection(mysqlConnection, isPromiseConnection: boolean) {
  let executeFun = null;
  if (isPromiseConnection) {
    executeFun = function () {
      return mysqlConnection.execute(arguments);
    };
  } else {
    executeFun = promisifyConnectionExecuteFun(mysqlConnection);
  }
  try {
    const [results] = await executeFun({sql: 'SELECT 1+1', timeout: 30000});
    return results[0]['1+1'] === 2
  } catch (e) {
    return false;
  }
}

async function findAvailableMysqlConnection(getConnectionFun, isPromiseConnection: boolean) {
  const MAX_RETRY_COUNTER = 100;
  let counter;
  for (counter = 0; counter < MAX_RETRY_COUNTER; counter++) {
    const mysqlConnection = await getConnectionFun();
    if (await checkMysqlConnection(mysqlConnection, isPromiseConnection)) {
      return mysqlConnection;
    } else {
      mysqlConnection.destroy();
      // PoolConnection.destroy 会间接地 mysqlConnection.release()，所以这里不用再 mysqlConnection.release()
      await sleep(10);
    }
  }
  throw new Error(`无法获取可用的 MySQL 数据库连接，已重试 ${counter} 次`);
}

/**
 * @param time 单位 ms 毫秒
 * @return {Promise<void>}
 */
function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
