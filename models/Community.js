const Sequelize = require("sequelize");
const db = require("../config/database");

const Community = db.define("community", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
	},
	slug: {
		type: Sequelize.STRING,
	},
	description: {
		type: Sequelize.STRING,
	},
	logoUrl: {
		type: Sequelize.STRING,
	},
	websiteUrl: {
		type: Sequelize.STRING,
	},
	primaryColor: {
		type: Sequelize.STRING,
	},
	secondaryColor: {
		type: Sequelize.STRING,
	},
	createdAt: {
		type: Sequelize.DATE,
	},
	createdBy: {
		type: Sequelize.UUID,
	},
	updatedAt: {
		type: Sequelize.DATE,
	},
	updatedBy: {
		type: Sequelize.UUID,
	},
	isDeleted: { type: Sequelize.BOOLEAN },
});
Community.sync().then(() => {
	console.log("community table created");
});
module.exports = Community;
