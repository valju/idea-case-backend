import express from "express";
import knex from "../../db/index.js"; // https://mariadb.com/kb/en/library/mariadb-error-codes/
import { validationResult } from "express-validator";
// importing self-made response/error handlers from /errorHandlers/index.js
import {successHandler,
    requestErrorHandler,  
    databaseErrorHandler,
    validationErrorHandler,
  } from "../../responseHandlers/index.js";
import {validateAddCategory} from '../../validationHandler/index.js'

const category = express.Router();

// GET ONE      >>> for EXAMPLE
/** http://localhost:8777/api/category/    with method=GET **/
// example: http://localhost:8777/api/category/1

category.get("/:id", function(req, res) {
  // console.log("id: " +req.params.id);
  if( isNaN(req.params.id)) {
    requestErrorHandler(res, "Category id should be number and this is not: " + req.params.id);
  } else if(req.params.id < 1) {
    requestErrorHandler(res, "Category id should be >= 1 and this is not: " + req.params.id);
  } else {
    knex
    .select()
    .from("Category")
    .where("id", req.params.id)
    .then((data) => {
      if (data.length === 1) {
        successHandler(res, data);
      } else {
        requestErrorHandler(res, "Non-existing category id: " + req.params.id);
      }
    })
    .catch((error) => {
      databaseErrorHandler(res, error);
  });
  }
});

// DELETE ONE      >>> for EXAMPLE
/** http://localhost:8777/api/category/1    with method=DELETE **/
// example: http://localhost:8777/api/category/1

category.delete("/:id", function(req, res) {
  knex("Category")
    .where("id", req.params.id)
    .del()
    .then(rowsAffected => {
      if (rowsAffected === 1) {
        successHandler(res, rowsAffected,
           "Delete successful! Count of deleted rows: " + rowsAffected);
      } else {
        requestErrorHandler(res, "Invalid category id: " + req.params.id);
      }
    })
    .catch(error => {
      databaseErrorHandler(res, error);
    });
});

// CREATE ONE      >>> for EXAMPLE
/** http://localhost:8777/api/category/   with method=POST **/

category.post("/", validateAddCategory, function(req, res) {

  // NOTE! Working incoming request data validation HERE!!!
  const valResult = validationResult(req);
  if (!valResult.isEmpty()) {
    return validationErrorHandler(res, valResult, "validateAddCategory error");
  }
  // Validation code ends. See the "return" => would stop handling of this request!

  knex.insert(req.body)
    .into("Category")
    .then((idArray) => {
      successHandler(res, idArray, 
        "Adding a category, or multiple categories was succesful");
      // Note, will send: [101] or [101,102], an array with all the auto-increment
      // ids for the newly added object(s).
    })
    .catch(error => {
      if (error.errno == 1062) {
        // 1062? Seek from https://mariadb.com/kb/en/library/mariadb-error-codes/
        requestErrorHandler(res, `Category with the name ${req.body.name} already exists!`);
      } else {
        databaseErrorHandler(res, error);
      }
    });
});

// UPDATE ONE      >>> for EXAMPLE
/** http://localhost:8777/api/category/update    with method=PUT **/
// example: http://localhost:8777/api/category/ (id in the body)

category.put("/", function(req, res) {
  if (!req.body.id || !req.body.name) {
    requestErrorHandler(res, "Category id or name are missing!");
  } else {
    knex("Category")
      .where("id", req.body.id)
      .update(req.body)
      .then(rowsAffected => {
        if (rowsAffected === 1) {
          successHandler(res, rowsAffected, 
            "Update successful! Count of modified rows: " + rowsAffected)            
        } else {
          requestErrorHandler(res, "Invalid category for update, id: " + req.body.id)
        }
      })
      .catch(error => {
        if (error.errno == 1062) {
          requestErrorHandler(res, `DB 1062: Category with the name ${req.body.name} already exists!`);
        } else {
          databaseErrorHandler(res, error);
        }
      });
  }
});

// GET ALL      >>> for EXAMPLE
/** http://172.32.234.23:8777/api/category/    with method=GET **/

category.get("/", function(req, res) {
  knex
    .select()
    .from("Category")
    .then(data => {
      successHandler(res, data, "category.get/all: Categories listed ok from DB");
    })
    .catch((error) => {
      if(error.errno===1146) {
        databaseErrorHandler(res, error, "category.get/all: Database table Category not created. ");
      } else {
        databaseErrorHandler(res, error, "category.get/all: ");
      }
    });
});

// **********************************************************************
// ******************** Other examples **********************************
// **********************************************************************

// GET ALL with specified keyword in name or description
/** http://localhost:8777/api/category/search/fun    with method=GET **/

category.get("/search/:keyword", function(req, res) {

  let keyword = req.params.keyword;  // just for shorter variable name later

  if(keyword && keyword.length>1) {
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
    requestErrorHandler(res, "Missing keyword, keyword is: " + keyword);
  }
});

// GET ALL ACTIVE / NOT ACTIVE
/** http://localhost:8777/api/category/all/isActive/false or true    with method=GET **/

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
    requestErrorHandler(res, "Request was missing the activeness value");
  }
});

// GET ALL with budget limit
/** http://localhost:8777/api/category/all/budgetLimit/999/true    with method=GET **/

category.get("/all/budgetLimit/:limit/:over", function(req, res) {
  if (isNaN(req.params.limit)) {
    requestErrorHandler(res);
  } else if (req.params.over === "true") {
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
  } else if (req.params.over === "false") {
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
    requestErrorHandler(res, "the parameter 'over' must be either true or false");
  }
});

export default category;

/* 
// What is a multi-post? First the single post
// Post e.g. the JSON from below in the POST body
{
	"name": "Jamborees",
  "description": "Jumbo Jambo Jembo",
  "budgetLimit": 1111,
  "isActive": "false"
}
*/

/* 
// Then multi-poist with a JSON array 
// (Would work with Knex insert req.body, if input checks allow)
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
