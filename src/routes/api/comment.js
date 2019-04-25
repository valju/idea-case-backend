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

export default comment;
