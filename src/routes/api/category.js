import express from 'express';
import knex from '../../db/index';

const category = express.Router();

/** http://localhost:8787/api/category/    with method=GET **/
category.get('/', function (req, res) {
  knex.select().from('Category').then((data) => {
    res.status(200);
    res.send(data);
  });
});

/** http://localhost:8787/api/category/    with method=POST **/
category.post('/', function (req, res) {
  // Just a start of err handling for model for you 
  if (req.body.firstName && req.body.lastName) {
    knex.insert(req.body).returning('*').into('Person').then(
      (data) => {
        res.status(200);
        res.send(data);
      }
    );
  } else {
    res.status(400);
    res.end(JSON.stringify({
      "error": "firstName and/or lastName missing"
    }));
  }
});

export default category;
