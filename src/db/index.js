import knex from 'knex';
import dotenv from 'dotenv';

import logger from '../utils/logger.js';

dotenv.config({});

export const databaseConfigObject = {
  client: process.env.DB_DRIVER_MODULE || 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, 
    debug: process.env.DB_DEBUG || false,
    multipleStatements: process.env.DB_MULTIPLE_STATEMENTS || true,
  },
  pool: {
    min: Number(process.env.DB_CONNECTION_POOL_MIN) || 0,
    max: Number(process.env.DB_CONNECTION_POOL_MAX) || 7,
  }
}

logger.debug("DB user: " +databaseConfigObject.connection.user);

// initiate knex with config, and export it for other modules
export default knex(databaseConfigObject);
