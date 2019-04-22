
import express from 'express';
//import knex from '../../db/index';
//import {getQueryFromFile} from '../../db/db_reset';

const reset_service = express.Router();

/*
// reset_service
// http://localhost:8787/api/reset_service/reset_all    with method=GET 

reset_service.get('/reset_all', function (req, res) {

    let sql = getQueryFromFile();
    sql = sqlCleaner(sql);

    console.log("sql: "+sql);                 // OR e.g. sql.substring(0,500)

    knex.raw(sql)
    .then(() => {

      res.status(200).send("DB reset was attempted").end();
    })
    .catch((error) => {
      res.status(500).send("DB reset failed, Database error: " + error.errno).end();
    });
});

// First desperate and not so professional attempts to clean
// comments and extra white space from SQL, 
// not working yet!
function sqlCleaner(sqlOriginal) {
    let sqlFinal = "";

    sqlFinal = sqlOriginal.replace('\t',' ');
    sqlFinal = sqlFinal.replace('\r',' ');
    sqlFinal = sqlFinal.replace('\n',' ');

    // This makes no sense, better solution should be
    // done below, reqexp or 
    // sqlFinal = sqlFinal.replace('          ',' ');
    // sqlFinal = sqlFinal.replace('         ',' ');
    // sqlFinal = sqlFinal.replace('        ',' ');
    // sqlFinal = sqlFinal.replace('       ',' ');
    // sqlFinal = sqlFinal.replace('      ',' ');
    // sqlFinal = sqlFinal.replace('     ',' ');
    // sqlFinal = sqlFinal.replace('    ',' ');
    // sqlFinal = sqlFinal.replace('   ',' ');
    

    //let reqexp= /\s/;
    //sqlFinal = sqlFinal.replace(reqexp,' ');
    
    sqlFinal = sqlFinal.replace('          ',' ');
    sqlFinal = sqlFinal.replace('         ',' ');
    sqlFinal = sqlFinal.replace('        ',' ');
    sqlFinal = sqlFinal.replace('       ',' ');
    sqlFinal = sqlFinal.replace('      ',' ');
    sqlFinal = sqlFinal.replace('     ',' ');
    sqlFinal = sqlFinal.replace('    ',' ');
    sqlFinal = sqlFinal.replace('   ',' ');

    // let wasWhiteSpace=false;
    // let sqlFinal2 = ""
    // let commentOn;
    // for(var i=0; i<sqlFinal.length; i++) {
    //     if(sqlFinal[i]=='/') {
    //         i++;
    //         commentOn = true;
    //         for(; commentOn && i<sqlFinal.length; i++) {
    //             if(sqlFinal[i]=='/') {
    //                 commentOn = false;
    //             }
    //         }
    //     }
    //     sqlFinal2 += sqlFinal[i];
    // }

    // return sqlFinal2;

    return sqlFinal;
}

*/
export default reset_service;