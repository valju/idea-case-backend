import knex from 'knex';
import { db_settings } from './db_settings';

// initiate knex with config
export default knex({
  client: "mysql",
  connection: {
    host: db_settings.host,
    port: db_settings.port,
    user: db_settings.user,
    password: db_settings.password,
    database: db_settings.database,
    debug: db_settings.debug
  },
  pool: {
    min: 0,
    max: 7
  }
});
