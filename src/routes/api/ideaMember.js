import express from "express";
import knex from "../../db/index";

const ideaMember = express.Router();

/* GET all idea member */
ideaMember.get("/all", (req, res) => {
  knex
    .select()
    .from("Idea_Member")
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST idea member
ideaMember.post("/", (req, res, next) => {
  let { ideaId, memberId } = req.body;
  return knex
    .select("ideaId")
    .from("Idea_Member")
    .where({ ideaId })
    .then(ideaList => {
      if (ideaList.length === 0) {
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

// PUT update idea member
ideaMember.put("/", (req, res, next) => {
  let { ideaId, memberId } = req.body;
  return knex
    .select("ideaId")
    .from("Idea_Member")
    .where({ ideaId })
    .then(ideaList => {
      if (ideaList.length > 0) {
        return knex("Idea_Member")
          .where({ ideaId })
          .update({ memberId });
      } else {
        throw new Error("Cannot find ideamember to update");
      }
    })
    .then(() => {
      return res.status(200).json({ success: "Idea member updated" });
    })
    .catch(err => {
      if (err.message === "Cannot find ideamember to update") {
        const error = new Error(err.message);
        error.status(404);
        next(error);
      } else {
        next(err);
      }
    });
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
