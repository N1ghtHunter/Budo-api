const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	walletAddress: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	bio: {
		type: Sequelize.STRING,
	},
	profilePictureUrl: {
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
User.sync().then(() => {
	console.log("User table synced");
});
module.exports = User;
