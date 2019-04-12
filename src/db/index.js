import knex from 'knex';
import DB_CONFIG from './DB_SETTINGS';

// initiate knex with config
export default knex({
  client: "mysql",
  connection: {
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    user: DB_CONFIG.user,
    password: DB_CONFIG.password,
    database: DB_CONFIG.database,
    debug: DB_CONFIG.debug
  },
  pool: {
    min: 0,
    max: 7
  }
});
