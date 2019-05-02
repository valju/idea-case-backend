import express from "express";
import knex from "../../db/index";

const ideaMember = express.Router();

// GET all idea member 
// GET http://localhost:8787/api/ideaMember/all
ideaMember.get("/all", (req, res) => {
  knex
    .select("ideaId", "memberId", "firstName", "lastName", "name")
    .from("Idea_Member")
    .join("Member", "Idea_Member.memberId", '=', 'Member.id')
    .join("Idea", "Idea_Member.ideaId", '=', 'Idea.id')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST idea member
// POST http://localhost:8787/api/ideaMember/
// example request body { "ideaId": "1001", "memberId": "101" }
ideaMember.post("/", (req, res, next) => {
  let { ideaId, memberId } = req.body;
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
});

// PUT update member in idea-member
ideaMember.put("/", (req, res, next) => {
  let { oldIdeaId, newIdeaId, oldMemberId, newMemberId } = req.body;

  //*** Update only memberId OR ideaId once at a time
  // Update memberId condition
  const MemberId_updateCondition = (newIdeaId === null) 
                                  && (newMemberId !== null) 
                                  && (Number(newMemberId) !== NaN) // no inputs like { "newMemberId": "abc"} 
                                  && (Number(newMemberId) !== 0) // no inputs like { "newMemberId": "" }

  // Update ideaId condition
  const IdeaId_updateCondition = (newMemberId === null) 
                                  && (newIdeaId !== null) 
                                  && (Number(newIdeaId) !== NaN) // no inputs like { "newIdeaId": "xyz" }
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
                                    + "Inputs have to contain a string of number."
    const error = new Error(errorMessage_wrongInputs)
    res.status(422).end(error.message)
  }
  
    
});

// DELETE delete idea member
ideaMember.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  knex("Idea_Member")
    .where("ideaId", id)
    .del()
    .then(data => res.status(200).json({ success: "Idea member deleted" }))
    .catch(err => next(err));
});

export default ideaMember;
