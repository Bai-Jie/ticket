export interface DataRepository {
  // dumpData(): Promise<void>;
  // deleteAllData(): Promise<void>;
}

/**
 * @param connection Sql 数据库连接
 * @param sqlStatements 用 ; 隔离的多个 SQL 语句，组成的字符串，可包含首位空格和换行
 */
export async function executeSqlStatements(connection, sqlStatements: string) {
  const statements = sqlStatements.split(';').map(it => it.trim()).filter(it => it !== '');
  for (const statement of statements) {
    const response = await connection.execute(statement);
    console.log(response);
  }
}

export async function dumpTable(connection, tableName) {
  const [results] = await connection.query(
    `SELECT * FROM ${tableName}`
  );
  console.log(`table "${tableName}":`);
  console.log(results);
}
