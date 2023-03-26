// OBSOLETE FILE, NOT FOLLOWING CURRENT IDEAS, FORGET!!!

import express from "express";
import knex from "../../db/index.js";

const comment = express.Router();

// GET ALL BY MEMBERID
/** http://SERVER_ADDRESS:PORT/api/comment/member/101    with method=GET **/
// example: http://SERVER_ADDRESS:PORT/api/comment/member/101

comment.get('/member/:id', function (req, res) {
  if (!isNaN(req.params.id) && req.params.id) {
    knex.select().from('Comment').where('memberId', req.params.id).orderBy("commentTimestamp", "desc")
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
/** http://SERVER_ADDRESS:PORT/api/comment/idea/1001    with method=GET **/
// example: http://SERVER_ADDRESS:PORT/api/comment/idea/1001

comment.get('/idea/:ideaId', function (req, res) {
  if (!isNaN(req.params.ideaId) && req.params.ideaId) {
    knex.select('Comment.id', 'ideaId', 'memberId', 'commentTimeStamp', 'commentText', 'firstName', 'lastName')
      .from('Comment').join('Member', 'Comment.memberId', '=', 'Member.id').where('ideaId', req.params.ideaId)
      .orderBy("commentTimestamp", "asc")
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

// GET ALL COMMENTS FROM TODAY
/** http://SERVER_ADDRESS:PORT/api/comment/all    with method=GET **/
// example: http://SERVER_ADDRESS:PORT/api/comment/all

comment.get('/all', function (req, res) {
  knex.raw('select Comment.id, ideaId, memberId, commentTimeStamp, commentText, firstName, lastName, Idea.name ' +
    'from Comment join Member on (Comment.memberId = Member.id) join Idea on (Comment.ideaId = Idea.id )' +
    'where date(commentTimeStamp) = curdate() order by commentTimeStamp asc')
    .then((data) => {
      res.status(200).send(data[0]).end();
    })
    .catch((error) => {
      res.status(500).send("Database error: " + error.errno).end();
    });
});

comment.get('/idea', function (req, res) {
  res.status(400).send("Invalid request!").end();
});

// GET ONE
// example: http://SERVER_ADDRESS:PORT/api/comment/10001

comment.get('/:id', function (req, res) {
  if (req.params.id) {
    knex.select().from('Comment')
      .where('id', req.params.id)
      .then((data) => {
        if (data.length != 1) {
          res.status(404).send("Invalid parameters.").end();
        } else {
          const comment = data[0];
          res.status(200).send(comment).end();
        }
      })
      .catch((error) => {
        res.status(500).send("Database error: " + error.errno).end();
      });
  } else {
    res.status(400).send("Invalid request!").end();
  }
});

// DELETE ONE
/** http://SERVER_ADDRESS:PORT/api/comment/1    with method=DELETE **/
// example: http://SERVER_ADDRESS:PORT/api/comment/10001

comment.delete('/:id', function (req, res) {
  if (!isNaN(req.params.id)) {
    knex('Comment')
      .where('id', req.params.id)
      .del()
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
/** http://SERVER_ADDRESS:PORT/api/comment/    with method=POST **/

comment.post('/old/', function (req, res) {

  if (!req.body.memberId || !req.body.ideaId) {
    res.status(400).send("Member ID or Idea ID are missing!").end();
  } else if (!req.body.commentText) {
    res.status(400).send("Comment body is missing!").end();
  } else {
    knex.select().from("Idea").where("id", req.body.ideaId)
      .then((data) => {
        if (data[0].readyForComments === 0) {
          res.status(400).send("Idea not ready for comments")
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
      })
      .catch((error) => {
        res.status(500).send("Database error: " + error.errno).end();
      })
  }

}
);

//LOCAL BRRANCH MANU

comment.post('/', function (req, res) {

  if (!req.body.memberId || !req.body.ideaId) {
    res.status(400).send("Member ID or Idea ID are missing!").end();
  } else if (!req.body.commentText) {
    res.status(400).send("Comment body is missing!").end();
  } else if (req.body.commentText.match('shit')) {
    res.status(400).send("No rude words allowed").end()
  }
  else {
    knex.select().from("Idea").where("id", req.body.ideaId)
      .then((data) => {
        if (data[0].readyForComments === 0) {
          res.status(400).send("Idea not ready for comments")
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
      })
      .catch((error) => {
        res.status(500).send("Database error: " + error.errno).end();
      })
  }

}
);

// EDIT ONE
/** http://SERVER_ADDRESS:PORT/api/comment/    with method=PUT **/
// example: http://SERVER_ADDRESS:PORT/api/comment (ideaId, memberId and commentTimeStamp in the body)

comment.put('/', function (req, res) {
  if (!req.body.id && !req.body.commentText) {
    res.status(400).send("Request body incomplete!").end();
  } else if (!req.body.commentText) {
    res.status(400).send("Comment body is missing!").end();
  } else {
    knex('Comment')
      .where('id', req.body.id)
      .update(req.body)
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
  "commentTimeStamp": "2019-04-24 20:46:25.640",
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
