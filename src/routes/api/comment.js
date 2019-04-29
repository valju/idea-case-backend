import express from "express";
import knex from "../../db/index";

const comment = express.Router();

// GET ALL BY MEMBERID
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
// example: http://localhost:8787/api/comment/idea/1001

comment.get('/idea/:id', function (req, res) {
  if (!isNaN(req.params.id) && req.params.id) {
    knex.select('ideaId', 'memberId', 'commentTimeStamp', 'commentText', 'firstName', 'lastName')
      .from('Comment').join('Member', 'Comment.memberId', '=', 'Member.id').where('ideaId', req.params.id)
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

comment.get('/idea', function (req, res) {
  res.status(400).send("Invalid request!").end();
});

// DELETE ONE
/** http://localhost:8787/api/comment/1    with method=DELETE **/
// example: http://localhost:8787/api/comment/101/1001/2019-04-25+17:45:18.5202

comment.delete('/:memberId/:ideaId/:commentTimeStamp', function (req, res) {
  if (!isNaN(req.params.memberId) && !isNaN(req.params.ideaId)) {
    knex('Comment').where(function () {
      this
        .where('memberId', req.params.memberId)
        .andWhere('IdeaId', req.params.ideaId)
        .andWhere('commentTimeStamp', req.params.commentTimeStamp)
    }).del()
      .then((data) => {
        if (data == 0) {
          res.status(404).send("No matching rows found!").end();
        } else {
          res.status(200).send("Delete successful! Count of deleted rows: " + data).end();
        }
      })
      .catch((error) => {
        res.status(500).send("Database error: " + error.message).end();
      });
  } else {
    res.status(400).send("Invalid request!").end();
  }
});

// CREATE ONE
/** http://localhost:8787/api/comment/    with method=POST **/

comment.post('/', function (req, res) {
  if (!req.body.memberId || !req.body.ideaId) {
    res.status(400).send("Member ID or Idea ID are missing!").end();
  } else if (!req.body.commentText) {
    res.status(400).send("Comment body is missing!").end();
  } else {
    knex.insert(req.body).into('Comment')
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((error) => {
        if (error.errno == 1452) {
          res.status(409).send("Member ID or Idea ID FK violation!").end();
        } else {
          res.status(500).send("Database error: " + error.errno).end();
        }
      });
  }
});

// EDIT ONE
/** http://localhost:8787/api/comment/    with method=PUT **/
// example: http://localhost:8787/api/comment (ideaId, memberId and commentTimeStamp in the body)

comment.put('/', function (req, res) {
  if (!req.body.memberId || !req.body.ideaId || !req.body.commentTimeStamp) {
    res.status(400).send("Request body incomplete!").end();
  } else if (!req.body.commentText) {
    res.status(400).send("Comment body is missing!").end();
  } else {
    knex('Comment').where(function () {
      this
        .where('memberId', req.body.memberId)
        .andWhere('ideaId', req.body.ideaId)
        .andWhere('commentTimeStamp', req.body.commentTimeStamp)
    }).update(req.body)
      .then((data) => {
        if (data == 0) {
          res.status(404).send("No matching comment was found!").end();
        } else {
          res.status(200).send("Update successful! Count of modified rows: " + data).end();
        }
      })
      .catch((error) => {
        if (error.errno == 1452) {
          res.status(409).send("Member ID or Idea ID FK violation!").end();
        } else {
          res.status(500).send("Database error: " + error.errno).end();
        }
      });
  }
});

/* Post e.g. the JSON from below in the PUT body
{
	"memberId": 101,
	"ideaId": 1001,
	"commentTimeStamp": "2019-04-24 20:46:25.6406",
	"commentText": "What a terrible idea! *edited*"
}
*/

/* Post e.g. the JSON from below in the POST body
{
	"memberId": 101,
  "ideaId": 1001,
  "commentText": "Hello! I am a fancy new comment."
}
*/

export default comment;
