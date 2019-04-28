import knex from "knex";
import { DB_SETTINGS } from "../CONSTANTS";

// initiate knex with config
export default knex({
  client: DB_SETTINGS.driverModule,
  connection: {
    host: DB_SETTINGS.host,
    port: DB_SETTINGS.port,
    user: DB_SETTINGS.user,
    password: DB_SETTINGS.password,
    database: DB_SETTINGS.database,
    debug: DB_SETTINGS.debug
  },
  pool: {
    min: DB_SETTINGS.connPoolMin,
    max: DB_SETTINGS.connPoolMax
  }
});
