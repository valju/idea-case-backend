import express from "express";
import knex from "../../db/index";
import ideaMember from "./ideaMember";

const member = express.Router();

/*
console.log("******");
console.dir(data);
console.log("******");
console.log(data);
console.log("******");
*/


//GET all contributors
// http://localhost:8787/api/member/all/contributors

member.get("/all/contributors", function (req, res) {
  let subquery = knex("Idea_Member").distinct("memberId");
  knex('Member').whereIn('id', subquery)
    .then(data => {
      res
        .status(200)
        .send(data);
    })
    .catch(error => {   // Just a generic error, repetition if file!
      res
        .status(500)
        .end();
    });
});

//GET all members
// http://localhost:8787/api/member/all

member.get("/all", function (req, res) {
  knex
    .select()
    .from("Member")
    .then(data => {
      res
        .status(200)
        .send(data);
    })
    .catch(error => {
      res
        .status(500)
        .send("Database error: " + error.errno);
    });
});

// ADD NEW MEMBER
/** http://localhost:8787/api/member/    with method=POST **/

member.post("/", function (req, res) {
  // Just a start of err handling for model for you
  if (req.body.firstName && req.body.lastName && req.body.email) {
    knex
      .insert(req.body)
      .returning("*")
      .into("Member")

      .then(data => {
        console.log(data);
        res.status(200);
        res.send({    // should maybe be just send(data)
          id: data    // that would return e.g. [104]
        });
      })
      .catch(error => {
        if (error.errno == 1062) {
          // https://mariadb.com/kb/en/library/mariadb-error-codes/
          res.status(409);
          res.send("Conflict: Member with that name already exists!");
        } else if (error.errno == 1054) {
          res.status(409);
          //to handle error for backend only
          res.send(
            "error in spelling [either in 'firstName' and/or in 'lastname' and or in 'email']."
          );
        } else {
          res.status(400);
          res.send("Database error, Error number: " + error.errno);
        }
      });
  } else {
    res.status(400);
    res.send(
      JSON.stringify({
        error: "first name and /or last name and/or email is missing."
      })
    );
  }
});

// members by id --
/** http://localhost:8787/api/member/    with method=GET **/
// example: http://localhost:8787/api/member/1
// This was somehow checked/fixed 2020-02-25
member.get("/:id", function (req, res) {
  let id = Number(req.params.id);
  if (id && !isNaN(id) && id > 0) {
    knex
      .select()
      .from("Member")
      .where("id", id)
      .then(data => {
        if (data.length == 1) {
          res
            .status(200)
            .send(data);
        } else {
          res
            .status(404)
            .send("Member with id: " + req.params.id + " was not found!");
        }
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
      .send("Member id: " + req.params.id + " is not valid!")
      .end();
  }

});

/** http://localhost:8787/api/member/:id    with method=DELETE **/
member.delete("/:id", function (req, res) {
  let id = Number(req.params.id);
  if (id && !isNaN(id) && id > 0) {
    knex
      .delete()
      .from("Member")
      .where("id", id)
      .then(data => {
        if (data === 1) {
          res
          .status(200)
          .end();   // Notice: This is the correct use of res.end() !
        } else {
          res
          .status(404)
          .send("Invalid member id: " + id);
        }
      })
      .catch(error => {
        res
          .status(500)
          .send("Database error: " + error.errno);
      });
    } else {
      res
        .status(400)
        .send("Member id: " + id + " is not valid!");
    }
});

//UPDATE member
/** http://localhost:8787/api/member/    with method=PUT **/

member.put("/", function (req, res) {
  // Just a start of err handling for model for you
  if (req.body.firstName && req.body.lastName && req.body.email) {
    knex("Member")
      .where("id", req.body.id)
      .update(req.body)
      .then(data => {
        if (data === 1) {
          res
            .status(200)
            .end();
        } else {
          res
            .status(404)
            .send("Update not successful, " + data + " row modified");
        }
      })
      .catch(error => {
        if (error.errno == 1062) {
          // https://mariadb.com/kb/en/library/mariadb-error-codes/
          res.status(409)
            .send("Conflict: Member with that name already exists!");
        } else if (error.errno == 1054) {
          res.status(400)
            //to handle error for backend only
            .send(
            "error in spelling [either in 'firstName' and/or in 'lastname' and or in 'email']."
            );
        } else {
          res.status(500)
              .send("Database error, Error number: " + error.errno);
        }
      });
  } else {
    res.status(400)
       .send({
        error: "first name and /or last name and/or email is missing."
      })
    );
  }
});

//GET Idea & Comments by member id

member.get("/idea/comment/:id", (req, res) => {
  let id = req.params.id;
  knex.select('commentTimeStamp', 'commentText', 'Idea.name')
    .from('Comment')
    .join('Idea', function () {
      this.on('Idea.id', '=', 'Comment.ideaId')
    })
    .where('Comment.memberId', id)
    .then(data => {
      if (data.length == 0) {
        res
          .status(404)
          .send(req.params.id + " No comments");
      } else {
        res
          .status(200)
          .send(data);
      }
    })
    .catch(err => res
      .status(500)
      .send({
        error: err.message
      }));
});

export default member;
