import knex from 'knex';

export const databaseConfigObject = {
  client: process.env.DB_DRIVER_MODULE || 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, 
    debug: process.env.DB_DEBUG || false,
    multipleStatements: process.env.DB_MULTIPLE_STATEMENTS || true,
  },
  pool: {
    min: process.env.DB_CONNECTION_POOL_MIN || 1,
    max: process.env.DB_CONNECTION_POOL_MAX || 5,
  }
}

// initiate knex with config
export default knex(databaseConfigObject);
