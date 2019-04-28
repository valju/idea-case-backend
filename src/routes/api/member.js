import express from "express";
import knex from "../../db/index";

const member = express.Router();

/** http://localhost:8787/api/member/all    with method=GET **/
member.get("/all", (req, res) => {
  knex
    .select()
    .from("Member")
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

/** http://localhost:8787/api/member/:id    with method=GET **/
member.get("/:id", function(req, res) {
  knex
    .select()
    .from("Member")
    .where("id", req.params.id)
    .then(data => {
      if (((data.length === 0 || isNaN(data)) && data == "") || !data) {
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

/** http://localhost:8787/api/member/:id    with method=GET **/
member.delete("/:id", function(req, res) {
  knex
    .delete()
    .from("Member")
    .where("id", req.params.id)
    .then(data => {
      if (((data.length === 0 || isNaN(data)) && data == "") || !data) {
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

/** http://localhost:8787/api/member/    with method=GET **/
member.post("/", function(req, res) {
  if ((!req.body.firstName, !req.body.lastName)) {
    res
      .status(400)
      .send("Member firstname and lastname is missing!")
      .end();
  } else {
    knex
      .insert(req.body)
      .into("Member")
      .then(data => {
        res.status(200);
        res.send(data);
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

/** http://localhost:8787/api/member/:id    with method=GET **/
member.put("/:id", function(req, res) {
  if (!req.body.id) {
    res
      .status(400)
      .send("id is missing!")
      .end();
  } else {
    knex("Member")
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
export default member;
