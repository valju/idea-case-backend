// OBSOLETE FILE, NOT FOLLOWING CURRENT IDEAS, FORGET!!!

import express from "express";
import knex from "../../db/index.js";
//import { IDEA_ERROR_CODES } from "../../ERROR_CODES.js";
const idea = express.Router();

// GET ALL
// http://localhost:8787/api/idea/all METHOD = GET
idea.get("/all", function(req, res) {
  knex
    .select()
    .from("Idea")
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

// GET ALL SORTED BY CRITERIA
// http://localhost:8787/api/idea/all/:criteria METHOD = GET
// Acceptable criteria: "name", "budget","peopleNeeded","creationDate","isModified"
idea.get("/all/sort/:criteria", function(req, res) {
  let validCriteria = [
    "name",
    "budget",
    "peopleNeeded",
    "creationDate",
    "isModified"
  ];
  if (validCriteria.indexOf(req.params.criteria) === -1) {
    res
      .status(400)
      .send("Invalid criteria: " + req.params.criteria)
      .end();
  } else {
    knex
      .select()
      .from("Idea")
      .orderBy(req.params.criteria)
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
  }
});
//GET ONE
//http://localhost:8787/api/idea/:id METHOD = GET
//Example: http://localhost:8787/api/idea/1004
idea.get("/:id", (req, res) => {
  knex
    .select()
    .from("Idea")
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

//GET BY CATEGORY
// http://localhost:8787/api/idea/byCategory/:id  METHOD = GET
// Example: http://localhost:8787/api/idea/byCategory/1
idea.get("/byCategory/:id", (req, res) => {
  knex
    .select()
    .from("Idea")
    .where("categoryId", req.params.id)
    .then(data => {
      if (data.length == 0) {
        res
          .status(404)
          .send("Invalid category id: " + req.params.id)
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
// GET BY COMMENT STATUS
// http://localhost:8787/api/idea/readyForComments/true  METHOD = GET
idea.get("/readyForComments/:commentStatus", function(req, res) {
  let commentStatus = null;
  if (req.params.commentStatus == "true") {
    commentStatus = 1;
  } else if (req.params.commentStatus == "false") {
    commentStatus = 0;
  }
  if (commentStatus !== null) {
    knex
      .select()
      .from("Idea")
      .where("readyForComments", commentStatus)
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

// GET BY LIMIT
// http://localhost:8787/api/idea/budget/500/true  METHOD = GET
idea.get("/budget/:limit/:over", function(req, res) {
  if (isNaN(req.params.limit)) {
    res
      .status(400)
      .send("Invalid request!")
      .end();
  } else if (req.params.over == "true") {
    knex
      .select()
      .from("Idea")
      .where("budget", ">", req.params.limit)
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
      .from("Idea")
      .where("budget", "<=", req.params.limit)
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

// GET BY PEOPLE NEEDED
// http://localhost:8787/api/idea/peopleNeeded/500/true  METHOD = GET
idea.get("/peopleNeeded/:limit/:over", function(req, res) {
  if (isNaN(req.params.limit)) {
    res
      .status(400)
      .send("Invalid request!")
      .end();
  } else if (req.params.over == "true") {
    knex
      .select()
      .from("Idea")
      .where("peopleNeeded", ">", req.params.limit)
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
      .from("Idea")
      .where("peopleNeeded", "<=", req.params.limit)
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

//GET BY EXACT CREATION DATE
//http://localhost:8787/api/idea/created/2019-04-02 METHOD = GET
idea.get("/created/:createdDate", (req, res) => {
  let dateStart = new Date(req.params.createdDate);
  if (isNaN(dateStart)) {
    res
      .status(400)
      .send("is not a Date")
      .end();
  } else {
    let dateEnd = new Date(req.params.createdDate + "T23:59:59.000Z");
    knex
      .select()
      .from("Idea")
      .where("creationDate", ">=", dateStart)
      .andWhere("creationDate", "<=", dateEnd)
      .then(data =>
        res
          .status(200)
          .send(data)
          .end()
      )
      .catch(error => {
        res
          .status(500)
          .send("Database error " + error.errno)
          .end();
      });
  }
});

//GET BY CREATED DATE RANGE
//http://localhost:8787/api/idea/created/2019-04-02 METHOD = GET
idea.get("/createdRange/:start/:end", (req, res) => {
  let dateStart = new Date(req.params.start);
  let dateEnd = new Date(req.params.end);
  if (isNaN(dateStart) || isNaN(dateEnd)) {
    res
      .status(400)
      .send("is not a Date")
      .end();
  } else {
    knex
      .select()
      .from("Idea")
      .where("creationDate", ">=", dateStart)
      .andWhere("creationDate", "<=", dateEnd)
      .then(data =>
        res
          .status(200)
          .send(data)
          .end()
      )
      .catch(error => {
        res
          .status(500)
          .send("Database error " + error.errno)
          .end();
      });
  }
});

//GET BY EXACT MODIFIED DATE
idea.get("/modified/:modifiedDate", (req, res) => {
  let dateStart = new Date(req.params.modifiedDate);
  if (isNaN(dateStart)) {
    res
      .status(400)
      .send("is not a Date")
      .end();
  } else {
    let dateEnd = new Date(req.params.createdDate + "T23:59:59.000Z");
    knex
      .select()
      .from("Idea")
      .where("isModified", ">=", dateStart)
      .andWhere("isModified", "<=", dateEnd)
      .then(data =>
        res
          .status(200)
          .send(data)
          .end()
      )
      .catch(error => {
        res
          .status(500)
          .send("Database error " + error.errno)
          .end();
      });
  }
});

//GET BY MODIFIED DATE RANGE
idea.get("/modifiedRange/:start/:end", (req, res) => {
  let dateStart = new Date(req.params.start);
  let dateEnd = new Date(req.params.end);
  if (isNaN(dateStart) || isNaN(dateEnd)) {
    res
      .status(400)
      .send("Input is not a Date")
      .end();
  } else {
    knex
      .select()
      .from("Idea")
      .where("isModified", ">=", dateStart)
      .andWhere("isModified", "<=", dateEnd)
      .then(data =>
        res
          .status(200)
          .send(data)
          .end()
      )
      .catch(error => {
        res
          .status(500)
          .send("Database error " + error.errno)
          .end();
      });
  }
});

// ADD ONE
// http://localhost:8787/api/idea METHOD = POST
// Bare minimum fields: name, description,readyForComments(boolean)

function checkIdea(idea) {
  let resultCode = IDEA_ERROR_CODES.OK;
  if (!idea.name) {
    resultCode = IDEA_ERROR_CODES.NAME_MISSING;
  }
  if (!idea.description) {
    resultCode = IDEA_ERROR_CODES.DESC_MISSING;
  }
  if (typeof idea.readyForComments !== "boolean") {
    resultCode = IDEA_ERROR_CODES.COMMENT_STATUS_MISSING;
  }
  if (idea.budget) {
    if (isNaN(idea.budget) || idea.budget < 0) {
      resultCode = IDEA_ERROR_CODES.BUDGET_INVALID;
    }
  }
  if (idea.peopleNeeded) {
    if (isNaN(idea.peopleNeeded) || idea.peopleNeeded < 0) {
      resultCode = IDEA_ERROR_CODES.PEOPLE_INVALID;
    }
  }
  return resultCode;
}

idea.post("/", (req, res) => {
  let timeStampPOST = new Date();
  if (checkIdea(req.body) === IDEA_ERROR_CODES.OK) {
    const ideaToInsert = {
      name: req.body.name,
      description: req.body.description,
      budget: req.body.budget ? req.body.budget : 0,
      readyForComments: req.body.readyForComments,
      peopleNeeded: req.body.peopleNeeded ? req.body.peopleNeeded : 0,
      creationDate: timeStampPOST,
      isModified: timeStampPOST,
      categoryId: req.body.categoryId
    };
    knex
      .insert(ideaToInsert)
      .into("Idea")
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
    let error = "";
    switch (checkIdea(req.body)) {
      case IDEA_ERROR_CODES.NAME_MISSING:
        error = "Idea name missing";
        break;
      case IDEA_ERROR_CODES.DESC_MISSING:
        error = "Idea description missing";
        break;
      case IDEA_ERROR_CODES.BUDGET_INVALID:
        error = "Idea budget is invalid";
        break;
      case IDEA_ERROR_CODES.COMMENT_STATUS_MISSING:
        error = "Idea comment status is missing";
        break;
      case IDEA_ERROR_CODES.PEOPLE_INVALID:
        error = "Idea peopleNeeded is invalid";
        break;
    }
    res
      .status(400)
      .send(error)
      .end();
  }
});

//EDIT ONE
// http://localhost:8787/api/idea METHOD = PUT
// Bare minimum fields: name, description,readyForComments

idea.put("/", (req, res) => {
  let timeStampPUT = new Date();
  if (!req.body.id) {
    res
      .status(400)
      .send("Idea id is missing")
      .end();
  } else if (checkIdea(req.body) === IDEA_ERROR_CODES.OK) {
    const ideaToInsert = {
      name: req.body.name,
      description: req.body.description,
      readyForComments: req.body.readyForComments,
      isModified: timeStampPUT,
      categoryId: req.body.categoryId
    };
    if (req.body.budget) {
      ideaToInsert.budget = req.body.budget;
    }
    if (req.body.peopleNeeded) {
      ideaToInsert.peopleNeeded = req.body.peopleNeeded;
    }

    knex("Idea")
      .where("id", req.body.id)
      .update(ideaToInsert)
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
        res
          .status(500)
          .send("Database error: " + error.errno)
          .end();
      });
  } else {
    let error = "";
    switch (checkIdea(req.body)) {
      case IDEA_ERROR_CODES.NAME_MISSING:
        error = "Idea name missing";
        break;
      case IDEA_ERROR_CODES.DESC_MISSING:
        error = "Idea description missing";
        break;
      case IDEA_ERROR_CODES.COMMENT_STATUS_MISSING:
        error = "Idea comment status is missing";
        break;
      case IDEA_ERROR_CODES.BUDGET_INVALID:
        error = "Idea budget is invalid";
        break;
      case IDEA_ERROR_CODES.PEOPLE_INVALID:
        error = "Idea peopleNeeded is invalid";
        break;
    }
    res
      .status(400)
      .send(error)
      .end();
  }
});

//DELETE ONE
// http://localhost:8787/api/idea/:id  METHOD = DELETE
// example: http://localhost:8787/api/idea/1007

idea.delete("/:id", function(req, res) {
  knex("Idea")
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
export default idea;

// let foo = req.params.createdDate;
// console.log(foo);
// console.log("DCXDSFWRYEUFNVMFJEUWPDMFNFHWYFOFNEBDYDF");
// if (foo.match(/([12]d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]d|3[01]))/)) {
//   let dateStart = new Date(req.params.createdDate);
//   console.log(dateStart);
//   res
//     .status(200)
//     .send("OK")
//     .end();
// } else {
//   res
//     .status(400)
//     .send("not OK")
//     .end();
// }

