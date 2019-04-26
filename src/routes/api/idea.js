import express from "express";
import knex from "../../db/index";
import { IDEA_CODE } from "../../CONSTANTS";
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

// ADD ONE
// http://localhost:8787/api/idea METHOD = POST
// Bare minimum fields: name, description,readyForComments(boolean)

function checkIdea(idea) {
  let resultCode = IDEA_CODE.IDEA_OK;
  if (!idea.name) {
    resultCode = IDEA_CODE.IDEA_NAME_MISSING;
  }
  if (!idea.description) {
    resultCode = IDEA_CODE.IDEA_DESC_MISSING;
  }
  if (typeof idea.readyForComments !== "boolean") {
    resultCode = IDEA_CODE.IDEA_COMMENT_STATUS_MISSING;
  }
  if (idea.budget) {
    if (isNaN(idea.budget) || idea.budget < 0) {
      resultCode = IDEA_CODE.IDEA_BUDGET_INVALID;
    }
  }
  if (idea.peopleNeeded) {
    if (isNaN(idea.peopleNeeded) || idea.peopleNeeded < 0) {
      resultCode = IDEA_CODE.IDEA_PEOPLE_INVALID;
    }
  }
  return resultCode;
}

idea.post("/", (req, res) => {
  let timeStampPOST = new Date();
  if (checkIdea(req.body) === IDEA_CODE.IDEA_OK) {
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
      case IDEA_CODE.IDEA_NAME_MISSING:
        error = "Idea name missing";
        break;
      case IDEA_CODE.IDEA_DESC_MISSING:
        error = "Idea description missing";
        break;
      case IDEA_CODE.IDEA_BUDGET_INVALID:
        error = "Idea budget is invalid";
        break;
      case IDEA_CODE.IDEA_COMMENT_STATUS_MISSING:
        error = "Idea comment status is missing";
        break;
      case IDEA_CODE.IDEA_PEOPLE_INVALID:
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
  } else if (checkIdea(req.body) === IDEA_CODE.IDEA_OK) {
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
      case IDEA_CODE.IDEA_NAME_MISSING:
        error = "Idea name missing";
        break;
      case IDEA_CODE.IDEA_DESC_MISSING:
        error = "Idea description missing";
        break;
      case IDEA_CODE.IDEA_COMMENT_STATUS_MISSING:
        error = "Idea comment status is missing";
        break;
      case IDEA_CODE.IDEA_BUDGET_INVALID:
        error = "Idea budget is invalid";
        break;
      case IDEA_CODE.IDEA_PEOPLE_INVALID:
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
// http://localhost:8787/api/idea/:id   METHOD = DELETE
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
