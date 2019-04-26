import express from "express";
import knex from "../../db/index";

const category = express.Router();

// GET ALL
/** http://localhost:8787/api/category/all    with method=GET **/

category.get("/all", function(req, res) {
  knex
    .select()
    .from("Category")
    .then(data => {
      res
        .status(200)
        .send(data)
        .end();
    })
    .catch(error => {
      res
        .status(500)
        .send("Database error: " + error.errno)
        .end();
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
        res
          .status(200)
          .send(data)
          .end();
      })
      .catch(error => {
        res
          .status(500)
          .send("Database error: " + error.errno)
          .end();
      });
  } else {
    res
      .status(400)
      .send("Invalid request!")
      .end();
  }
});

// GET ALL with budget limit
/** http://localhost:8787/api/category/all/isActive/false or true    with method=GET **/

category.get("/all/budgetLimit/:limit/:over", function(req, res) {
  if (isNaN(req.params.limit)) {
    res
      .status(400)
      .send("Invalid request!")
      .end();
  } else if (req.params.over == "true") {
    knex
      .select()
      .from("Category")
      .where("budgetLimit", ">", req.params.limit)
      .then(data => {
        res
          .status(200)
          .send(data)
          .end();
      })
      .catch(error => {
        res
          .status(500)
          .send("Database error: " + error.errno)
          .end();
      });
  } else if (req.params.over == "false") {
    knex
      .select()
      .from("Category")
      .where("budgetLimit", "<=", req.params.limit)
      .then(data => {
        res
          .status(200)
          .send(data)
          .end();
      })
      .catch(error => {
        res
          .status(500)
          .send("Database error: " + error.errno)
          .end();
      });
  } else {
    res
      .status(400)
      .send("Invalid request!")
      .end();
  }
});

// GET ONE
/** http://localhost:8787/api/category/    with method=GET **/
// example: http://localhost:8787/api/category/1

category.get("/:id", function(req, res) {
  knex
    .select()
    .from("Category")
    .where("id", req.params.id)
    .then(data => {
      if (data.length == 0) {
        res
          .status(404)
          .send("Invalid row number: " + req.params.id)
          .end();
      } else {
        res
          .status(200)
          .send(data)
          .end();
      }
    })
    .catch(error => {
      res
        .status(500)
        .send("Database error: " + error.errno)
        .end();
    });
});

// DELETE ONE
/** http://localhost:8787/api/category/1    with method=DELETE **/
// example: http://localhost:8787/api/category/1

category.delete("/:id", function(req, res) {
  knex("Category")
    .where("id", req.params.id)
    .del()
    .then(data => {
      if (data == 0) {
        res
          .status(404)
          .send("Invalid row number: " + req.params.id)
          .end();
      } else {
        res
          .status(200)
          .send("Delete successful! Count of deleted rows: " + data)
          .end();
      }
    })
    .catch(error => {
      res
        .status(500)
        .send("Database error: " + error.errno)
        .end();
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
      .then(data => {
        res.status(200);
        res.send(data);
      })
      .catch(error => {
        if (error.errno == 1062) {
          // https://mariadb.com/kb/en/library/mariadb-error-codes/
          res
            .status(409)
            .send("Category with that name already exists!")
            .end();
        } else {
          res
            .status(500)
            .send("Database error: " + error.errno)
            .end();
        }
      });
  }
});

// EDIT ONE
/** http://localhost:8787/api/category/    with method=PUT **/
// example: http://localhost:8787/api/category (id in the body)

category.put("/", function(req, res) {
  if (!req.body.id || !req.body.name) {
    res
      .status(400)
      .send("Category id or name are missing!")
      .end();
  } else {
    knex("Category")
      .where("id", req.body.id)
      .update(req.body)
      .then(data => {
        if (data == 0) {
          res
            .status(404)
            .send("Invalid row number: " + req.body.id)
            .end();
        } else {
          res
            .status(200)
            .send("Update successful! Count of modified rows: " + data)
            .end();
        }
      })
      .catch(error => {
        if (error.errno == 1062) {
          res
            .status(409)
            .send("Category with that name already exists!")
            .end();
        } else {
          res
            .status(500)
            .send("Database error: " + error.errno)
            .end();
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
