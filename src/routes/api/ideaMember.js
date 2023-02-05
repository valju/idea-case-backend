// OBSOLETE FILE, NOT FOLLOWING CURRENT IDEAS, FORGET!!!

import express from "express";
import knex from "../../db/index.js";

const ideaMember = express.Router();

// GET all idea member 
// GET http://localhost:PORT/api/ideaMember/all
ideaMember.get("/all", (req, res) => {
  knex
    .select("ideaId", "memberId", "firstName", "lastName", "name")
    .from("Idea_Member")
    .join("Member", "Idea_Member.memberId", '=', 'Member.id')
    .join("Idea", "Idea_Member.ideaId", '=', 'Idea.id')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET idea member by (ideaId, memberId)
// GET http://localhost:PORT/api/ideaMember/ideaId/memberId
ideaMember.get("/old/:ideaId/:memberId", (req, res) => {
  let { ideaId, memberId } = req.params

  const getCondition = (!isNaN(Number(ideaId)) && Number(ideaId) !== 0
                        && !isNaN(Number(memberId)) && Number(memberId) !== 0)

  if (getCondition) {
    return knex
    .select("ideaId", "memberId", "firstName", "lastName", "name")
    .from("Idea_Member")
    .join("Member", "Idea_Member.memberId", '=', 'Member.id')
    .join("Idea", "Idea_Member.ideaId", '=', 'Idea.id')
    .where({ ideaId,  memberId })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data[0])
      } else if (data.length === 0) {
        res.status(404).json({error: "Cannot find idea-member with id (" + ideaId + ", " + memberId + ")"})
      }}
    )
    .catch(err => res.status(500).json({ error: err.message }));
  } else {
    const errorMessage = "Parameters must be number!"
    const error = new Error(errorMessage)
    res.status(422).end(error.message)
  }
  
});

ideaMember.get("/:ideaId/:memberId", (req, res) => {
  let { ideaId, memberId } = req.params

  const getCondition = (!isNaN(Number(ideaId)) && Number(ideaId) !== 0
                        && !isNaN(Number(memberId)) && Number(memberId) !== 0)

  if (getCondition) {
    return knex
    .select("ideaId", "memberId", "firstName", "lastName", "name")
    .from("Idea_Member")
    .join("Member", "Idea_Member.memberId", '=', 'Member.id')
    .join("Idea", "Idea_Member.ideaId", '=', 'Idea.id')
    .where({ ideaId,  memberId })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data[0])
      } else if (data.length === 0) {
        res.status(404).json({error: `Cannot find idea-member with id ( ${ideaId} , ${memberId})`})
      }}
    )
    .catch(err => res.status(500).json({ error: err.message }));
  } else {
    const errorMessage = "Parameters must be number!"
    const error = new Error(errorMessage)
    res.status(422).end(error.message)
  }
  
});





// POST idea member
// POST http://localhost:PORT/api/ideaMember/
// example request body { "ideaId": "1001", "memberId": "101" }
ideaMember.post("/", (req, res, next) => {
  let { ideaId, memberId } = req.body;

  const updateCondition = (!isNaN(Number(ideaId)) && Number(ideaId) !== 0
                          && !isNaN(Number(memberId)) && Number(memberId) !== 0)

  if (updateCondition) {
    return knex
    .select("ideaId", "memberId")
    .from("Idea_Member")
    .where({ ideaId,  memberId })
    .then(list => {
      if (list.length === 0) {
        return knex
          .insert({ ideaId, memberId })
          .returning("*")
          .into("Idea_Member");
      } else {
        throw new Error("The idea member is already existed");
      }
    })
    .then(data => {
      return res.status(200).json({ success: "Idea member inserted" });
    })
    .catch(err => {
      if (err.message === "The idea member is already existed") {
        const error = new Error(err.message);
        error.status = 409;
        next(error);
      } else {
        next(err);
      }
    });
  } else {
    const errorMessage = "Parameters must be number!"
    const error = new Error(errorMessage)
    res.status(422).end(error.message)
  }
  
});





// PUT update idea-member (update ideaId OR memberId)
// PUT http://localhost:PORT/api/ideaMember/
// Example request body for updating ideaId: 
// { "oldIdeaId": "1001", "newIdeaId": "1003", "oldMemberId": "103", "newMemberId": null }
// Example request body for updating memberId: 
// { "oldIdeaId": "1004", "newIdeaId": null, "oldMemberId": "102", "newMemberId": "101" }
ideaMember.put("/", (req, res, next) => {
  let { oldIdeaId, newIdeaId, oldMemberId, newMemberId } = req.body;

  //*** Update only memberId OR ideaId once at a time
  // Update memberId => newIdeaId = null
  // Update ideaId => newMemberId = null

  // Update memberId condition
  const MemberId_updateCondition = (newIdeaId === null) 
                                  && (newMemberId !== null) 
                                  && (!isNaN(Number(newMemberId))) // no inputs like { "newMemberId": "abc"} 
                                  && (Number(newMemberId) !== 0) // no inputs like { "newMemberId": "" }

  // Update ideaId condition
  const IdeaId_updateCondition = (newMemberId === null) 
                                  && (newIdeaId !== null) 
                                  && (!isNaN(Number(newIdeaId))) // no inputs like { "newIdeaId": "xyz" }
                                  && (Number(newIdeaId) !== 0) // no inputs like { "newIdeaId": "" }

  // Update memberId
  if (MemberId_updateCondition) {
    return knex
    .select("ideaId", "memberId")
    .from("Idea_Member")
    .where({ 
      ideaId: oldIdeaId, 
      memberId: oldMemberId 
    })
    .then(list => {
      if (list.length > 0) {
        return knex("Idea_Member")
          .where({ 
            ideaId: oldIdeaId,
            memberId: oldMemberId 
          })
          .update({ memberId: newMemberId });
      } else {
        throw new Error("Cannot find idea-member to update");
      }
    })
    .then(() => {
      return res.status(200).json({ success: "Member of an idea-member updated" });
    })
    .catch(err => {
      if (err.message === "Cannot find idea-member to update") {
        const error = new Error(err.message);
        res.status(404).end(error.message);
        next(error);
      } else {
        next(err);
      }
    });

  //Update ideaId
  } else if (IdeaId_updateCondition) {
      return knex
      .select("ideaId", "memberId")
      .from("Idea_Member")
      .where({ 
        ideaId: oldIdeaId, 
        memberId: oldMemberId 
      })
      .then(list => {
        if (list.length > 0) {
          return knex("Idea_Member")
            .where({ 
              ideaId: oldIdeaId,
              memberId: oldMemberId 
            })
            .update({ ideaId: newIdeaId });
        } else {
          throw new Error("Cannot find idea-member to update");
        }
      })
      .then(() => {
        return res.status(200).json({ success: "Member of an idea-member updated" });
      })
      .catch(err => {
        if (err.message === "Cannot find idea-member to update") {
          const error = new Error(err.message);
          res.status(404).end(error.message);
          next(error);
        } else {
          next(err);
        }
      });
  } else {
    const errorMessage_wrongInputs = "Inputs are not correct! "
                                    + "Inputs' length cannot be 0. "
                                    + "Inputs CANNOT be NULL (except for memberId & ideaId). "
                                    + "ideaId and numberId CANNOT be NULL at the same time. "
                                    + "ideaId and numberId CANNOT be updated at the same time. "
                                    + "Inputs have to contain a string of number."
    const error = new Error(errorMessage_wrongInputs)
    res.status(422).json({
      error: error.message,
      updateIdeaId_example: { "oldIdeaId": "1001", "newIdeaId": "1003", "oldMemberId": "103", "newMemberId": null },
      updateMemberId_example: { "oldIdeaId": "1004", "newIdeaId": null, "oldMemberId": "102", "newMemberId": "101" }
    })
  }
  
    
});

// DELETE delete idea member
// DELETE http://localhost:PORT/api/ideaMember/1001/103
ideaMember.delete("/:ideaId/:memberId", (req, res, next) => {
  let ideaId = req.params.ideaId;
  let memberId = req.params.memberId;

  const deleteCondition = (!isNaN(Number(ideaId)) && Number(ideaId) !== 0
                          && !isNaN(Number(memberId)) && Number(memberId) !== 0)

  if (deleteCondition) {
    knex("Idea_Member")
    .where({ ideaId, memberId })
    .del()
    .then(data => {
      if (data > 0) {
        res.status(200).json({ success: "Idea member deleted" })
      } else if (data === 0) {
        const error = new Error("Cannot find idea-member with id (" + ideaId + ", " + memberId + ") to delete!")
        res.status(404).end(error.message)
      }
    }) 
    .catch(err => next(err));
  } else {
    const errorMessage = "Parameters must be number!"
    const error = new Error(errorMessage)
    res.status(422).end(error.message)
  }
  
});

export default ideaMember;
