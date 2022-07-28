const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Sequelize = require("sequelize");
const Community = require("../models/Community");
const util = require("../util/api_util").communities;
//readAll
router.get("/", (req, res) => {
	util.findAll()
		.then((community) => res.status(200).send(community))
		.catch((err) => console.log(err));
});
//Read by id
router.get("/:id", (req, res) => {
	util.findOne(req.params.id)
		.then((community) => res.status(200).send(community))
		.catch((err) => console.log(err));
});
//create
router.post("/add", (req, res) => {
	let data = ({ name, slug, description, logoUrl, websiteUrl, primaryColor, secondaryColor, createdBy, updatedBy } = req.body);
	util.add(data).then((community) => res.send(community));
});
//updating using id
router.put("/:id/update", (req, res) => {
	util.update(req.body, req.params.id).then((community) => res.send(community));
});
//DELETE ALL
router.delete("/delete", (req, res) => {
	util.delete().then(res.status(200).redirect("/communities"));
});

module.exports = router;
