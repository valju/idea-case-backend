import express from "express";
import knex from "../../db/index";

const member = express.Router();

//GET all members
// http://localhost:8787/api/member/all

member.get("/all", function(req, res) {
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

export default member;
