const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	username: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	},
	walletAddress: {
		type: Sequelize.STRING,
	},
	bio: {
		type: Sequelize.STRING,
	},
	profilePictureUrl: {
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
User.sync().then(() => {
	console.log("user table created");
});
module.exports = User;
