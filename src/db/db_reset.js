import '@babel/polyfill';
import mysql from 'mysql';
import * as fs from 'fs';
import DB_CONFIG from './DB_SETTINGS';

// define the SQL scripts location and file names
const scriptFolder = './Database/SQL_Scripts/';
const scriptFiles = [
  '00_drop_tables.sql',
  '01_create_tables.sql',
  '02_insert_technical_test_data.sql',
];

// read the SQL scripts from filepath
function getQueryFromFile() {
  let query = '';
  for (let i = 0; i < scriptFiles.length; i++) {
    query += fs.readFileSync((scriptFolder + scriptFiles[i]), "utf8", function (err, data) {
      if (err) throw err;
      return toString(data);
    })
  }
  return query;
}

// create mysql connection
async function getConnection() {
  return mysql.createConnection({
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    user: DB_CONFIG.user,
    password: DB_CONFIG.password,
    database: DB_CONFIG.database,
    multipleStatements: DB_CONFIG.multipleStatements,
    debug: DB_CONFIG.debug,
  })
};

// wait for connection promise to complete
// then query remote db with the received client object
getConnection()
  .then(client => {
    client.query(getQueryFromFile(),
      function (err, results, fields) {
        if (err) throw err;
        console.log("database reset successful!");
        client.end();
      }
    )
  }).catch(err => {
    console.log(err);
  });