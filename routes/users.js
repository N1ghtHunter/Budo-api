const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Sequelize = require("sequelize");
const User = require("../models/User");
const util = require("../util/api_util").users;
//readAll
router.get("/", (req, res) => {
	util.findAll()
		.then((users) => res.status(200).send(users))
		.catch((err) => console.log(err));
});
//Read by id
router.get("/:id", (req, res) => {
	util.findOne(req.params.id)
		.then((user) => res.status(200).send(user))
		.catch((err) => console.log(err));
});
//create
router.post("/add", (req, res) => {
	let data = ({ username, email, walletAddress, bio, profilePictureUrl, createdBy, updatedBy } = req.body);
	util.add(data).then((user) => res.send(user));
});
//updating using id
router.put("/:id/update", (req, res) => {
	util.update(req.body, req.params.id).then((result) => {
		console.log(result);
		res.send(result);
	});
});
//DELETE
router.delete("/delete", (req, res) => {
	util.delete().then(res.status(200).redirect("/users"));
});
router.delete("/delete/:id", (req, res) => {
	util.deleteOne(req.params.id).then(res.status(200).redirect("/users"));
});
module.exports = router;
