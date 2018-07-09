// @flow
import {version} from '../package.json';
import path from 'path';
import {config as configDotEnv} from 'dotenv';

const dotenvFiles = ['.env', '.env.local'];
dotenvFiles.forEach(fotenvFile => configDotEnv({path: path.resolve(process.cwd(), fotenvFile)}));

type MemoryDataSourceConfig = {
  useMemoryDataSource: true
}
type MysqlDataSourceConfig = {
  useMemoryDataSource: false,
  mysql: {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
  }
}

function dataSource(): MemoryDataSourceConfig | MysqlDataSourceConfig {
  if (process.env.useMemoryDataSource === 'true') {
    return {
      useMemoryDataSource: true
    };
  }

  return {
    useMemoryDataSource: false,
    mysql: {
      host: process.env.mysqlHost,
      port: process.env.mysqlPort && +process.env.mysqlPort,
      user: process.env.mysqlUser,
      password: process.env.mysqlPassword,
      database: process.env.mysqlDatabase
    }
  }
}

const config = {
  version,
  get dataSource() {
    return dataSource();
  },
  get mysqlConnectionConfig() {
    return {
      ...config.dataSource.mysql,
      queryFormat(query, values) {
        if (!values) {
          return query;
        }
        return query.replace(/\:(\w+)/g, (txt, key) => {
          if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
          }
          return txt;
        });
      }
    };
  }
};

export default config;
