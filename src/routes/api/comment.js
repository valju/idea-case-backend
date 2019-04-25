import express from "express";
import knex from "../../db/index";

const comment = express.Router();

// GET ONE
/** http://localhost:8787/api/comment/member/101    with method=GET **/
// example: http://localhost:8787/api/comment/member/101

comment.get('/member/:id', function (req, res) {
  if (!isNaN(req.params.id) && req.params.id) {
    knex.select().from('Comment').where('memberId', req.params.id)
    .then((data) => {
        if (data.length == 0) {
        res.status(404).send("Invalid row number: " + req.params.id).end();
        } else {
        res.status(200).send(data).end();
        }
    })
    .catch((error) => {
        res.status(500).send("Database error: " + error.errno).end();
    });
  } else {
    res.status(400).send("Invalid request!").end();
  }
});

comment.get('/member', function (req, res) {
  res.status(400).send("Invalid request!").end();
});

// GET ALL BY IDEAID
/** http://localhost:8787/api/comment/idea/1001    with method=GET **/

comment.get('/idea/:ideaid', function (req, res) {
  console.log(req.params.ideaid);
  if (!isNaN(req.params.ideaid) && req.params.ideaid) {
    knex.select().from('Comment').where('ideaId', req.params.ideaid)
      .then((data) => {
        res.status(200).send(data).end();
      })
      .catch((error) => {
        res.status(500).send("Database error: " + error.errno).end();
      });
  } else {
    res.status(400).send("Invalid request!").end();
  }
});

comment.get('/idea', function (req, res) {
  res.status(400).send("Invalid request!").end();
});

export default comment;
