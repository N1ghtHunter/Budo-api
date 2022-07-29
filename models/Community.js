const Sequelize = require("sequelize");
const db = require("../config/database");

const Community = db.define("community", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	slug: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
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
		allowNull: false,
	},
	createdBy: {
		type: Sequelize.UUID,
	},
	updatedAt: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	updatedBy: {
		type: Sequelize.UUID,
	},
	isDeleted: { type: Sequelize.BOOLEAN },
});
Community.sync().then(() => {
	console.log("Community table Synced");
});
module.exports = Community;
