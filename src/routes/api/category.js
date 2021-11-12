/import express from "express";
import knex from "../../db/index";
// https://mariadb.com/kb/en/library/mariadb-error-codes/

// importing self-made response/error handlers from /errorHandlers/index.js
import {
    successHandler, 
    requestErrrorHandler,  
    databaseErrorHandler,
  } from "../../errorHandlers"

const category = express.Router();

// GET ALL with specified keyword in name or description
/** http://localhost:8787/api/category/search/fun    with method=GET **/

category.get("/search/:keyword", function(req, res) {

  let keyword = req.params.keyword;  // just for shorter variable name later

  if(keyword && keyword.length>0) {
    knex
      .select('*').from("Category")
      .where('name', 'like', `%${keyword}%`)
      .andWhere('description', 'like', `%${keyword}%`)
      .union(function() {
        this.select('*').from("Category")
        .where('name', 'like', `%${keyword}%`)
        .andWhereNot('description', 'like', `%${keyword}%`)})
      .union(function() {
        this.select('*').from("Category")
        .whereNot('name', 'like', `%${keyword}%`)
        .andWhere('description', 'like', `%${keyword}%`)})
      .then(data => {
          successHandler(res,data);
      })
      .catch(error => {
        if(error.errno===1146) {
          databaseErrorHandler(res, error, "Database table Category does not exist.");
        } else {
          databaseErrorHandler(res, error);
        }
      });
  } else {
    requestErrrorHandler(res, "Missing keyword, keyword is: " + keyword);
  }
});

// GET ALL
/** http://localhost:8787/api/category/all    with method=GET **/

category.get("/all", function(req, res) {
  knex
    .select()
    .from("Category")
    .then(data => {
      successHandler(res, data, "Category listing went ok in DB");
    })
    .catch(error => {
      if(error.errno===1146) {
        databaseErrorHandler(res, error, "Database table Category not created.");
      } else {
        databaseErrorHandler(res, error);
      }

    });
});

// GET ALL ACTIVE / NOT ACTIVE
/** http://localhost:8787/api/category/all/isActive/false or true    with method=GET **/

category.get("/all/isActive/:activeness", function(req, res) {
  let activeness = null;
  
  if (req.params.activeness == "true") {
    activeness = 1;
  } else if (req.params.activeness == "false") {
    activeness = 0;
  }

  if (activeness !== null) {
    knex
      .select()
      .from("Category")
      .where("isActive", activeness)
      .then(data => {
        successHandler(res, data);
      })
      .catch(error => {
        databaseErrorHandler(res, error);
      });
  } else {
    requestErrrorHandler(res, "Request was missing the activeness value");
  }
});

// GET ALL with budget limit
/** http://localhost:8787/api/category/all/isActive/false or true    with method=GET **/

category.get("/all/budgetLimit/:limit/:over", function(req, res) {
  if (isNaN(req.params.limit)) {
    requestErrrorHandler(res);
  } else if (req.params.over == "true") {
    knex
      .select()
      .from("Category")
      .where("budgetLimit", ">", req.params.limit)
      .then(data => {
        successHandler(res, data);
      })
      .catch(error => {
        databaseErrorHandler(res, error);
      });
  } else if (req.params.over == "false") {
    knex
      .select()
      .from("Category")
      .where("budgetLimit", "<=", req.params.limit)
      .then(data => {
        successHandler(res, data);
      })
      .catch(error => {
        databaseErrorHandler(res, error);
      });
  } else {
    requestErrrorHandler(res);
  }
});

// GET ONE
/** http://localhost:8787/api/category/    with method=GET **/
// example: http://localhost:8787/api/category/1

category.get("/:id", function(req, res) {

  console.log("id: " +req.params.id);

  if( isNaN(req.params.id)) {
    requestErrrorHandler(res, "Id should be number and this is not: " + req.params.id);
  } else if(req.params.id < 1) {
    requestErrrorHandler(res, "Id should be >= 1 and this is not: " + req.params.id);
  } else {
    knex
    .select()
    .from("Category")
    .where("id", req.params.id)
    .then(data => {
      if (data.length === 1) {
        successHandler(res, data);
      } else {
        requestErrrorHandler(res, "Non-existing category id: " + req.params.id);
      }
    })
    .catch(error => {
      databaseErrorHandler(res, error);
  });
  }


});

// DELETE ONE
/** http://localhost:8787/api/category/1    with method=DELETE **/
// example: http://localhost:8787/api/category/1

category.delete("/:id", function(req, res) {
  knex("Category")
    .where("id", req.params.id)
    .del()
    .then(rowsAffected => {
      if (rowsAffected === 1) {
        successHandler(res, rowsAffected,
           "Delete successful! Count of deleted rows: " + rowsAffected);
      } else {
        requestErrrorHandler(res, "Invalid row number: " + req.params.id);
      }
    })
    .catch(error => {
      databaseErrorHandler(res, error);
    });
});

// CREATE ONE
/** http://localhost:8787/api/category/    with method=POST **/

category.post("/", function(req, res) {
  if (!req.body.name) {
    res
      .status(400)
      .send("Category name is missing!")
      .end();
  } else {
    knex
      .insert(req.body)
      .into("Category")
      .then(idArray => {
        res.status(200);
        res.send(idArray);     // Note, will send: [ 101 ], an array with one id
      })
      .catch(error => {
        if (error.errno == 1062) {
          // 1062? Seek from https://mariadb.com/kb/en/library/mariadb-error-codes/
          databaseErrorHandler(res, error, "Category with that name already exists!");
        } else {
          databaseErrorHandler(res, error);
        }
      });
  }
});

// EDIT ONE
/** http://localhost:8787/api/category/    with method=PUT **/
// example: http://localhost:8787/api/category (id in the body)

category.put("/", function(req, res) {
  if (!req.body.id || !req.body.name) {
    requestErrrorHandler(res, "Category id or name are missing!");
  } else {
    knex("Category")
      .where("id", req.body.id)
      .update(req.body)
      .then(rowsAffected => {
        if (rowsAffected === 1) {
          successHandler(res, rowsAffected, 
            "Update successful! Count of modified rows: " + rowsAffected)
            
        } else {
          requestErrrorHandler(res, "Invalid row number: " + req.body.id)
        }
      })
      .catch(error => {
        if (error.errno == 1062) {
          databaseErrorHandler(res, error, "Category with that name already exists!");
        } else {
          databaseErrorHandler(res, error);
        }
      });
  }
});

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
