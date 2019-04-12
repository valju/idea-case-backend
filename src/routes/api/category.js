import express from 'express';
import knex from '../../db/index';

const category = express.Router();

// These have been tested to work!!! 2019-04-12

/** http://localhost:8787/api/category/all    with method=GET **/
category.get('/all', function (req, res) {
  knex.select().from('Category').then((data) => {
    res.status(200);
    res.send(data);
  });
});

/** http://localhost:8787/api/category/    with method=GET **/
// http://localhost:8787/api/category?id=1 
category.get('/', function (req, res) {
  knex.select().from('Category').where('id',req.query.id).then((data) => {
    res.status(200);
    res.send(data);
  });
});

/** http://localhost:8787/api/category/    with method=POST **/
category.post('/', function (req, res) {
  // Just a start of err handling for model for you 
  //if (req.body.name && req.body.description) {
    knex.insert(req.body).returning('*').into('Category').then(
      (data) => {
        res.status(200);
        res.send(data);
      }
    ).catch ((error)=> {
        res.status(400);
        res.send(error);
    });
  /*
    } else {
    res.status(400);
    res.end(JSON.stringify({
      "error": "firstName and/or lastName missing"
    }));
  }
  */
});

// The req.body.name etc. parameter check would work, but 
// naturally not with the multi-insert with JSON array below

export default category;

/* Post e.g. the JSON from below in the POST body
{
	"name": "Jamborees",
    "description": "Jumbo Jambo Jembo",
    "budgetLimit": 1111,
    "isActive": "false"
}
*/

/* Or this JSON array
[{
	"name": "Jamborees2",
    "description": "Jumbo Jambo Jembo",
    "budgetLimit": 1111,
    "isActive": "false"
},
{
	"name": "Jamborees3",
    "description": "Jumbo Jambo Jembo",
    "budgetLimit": 1111,
    "isActive": "false"
}]
*/