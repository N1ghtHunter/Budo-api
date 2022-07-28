const express = require("express");
const db = require("../config/database");
const Sequelize = require("sequelize");
const User = require("../models/User");
const Community = require("../models/Community");
let users = {};
let communities = {};
users.add = async (data) => {
	return new Promise((resolve, reject) => {
		User.create(data)
			.then((user) => {
				resolve(user);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
users.update = async (data, id) => {
	return new Promise((resolve, reject) => {
		User.update(data, { where: { id: id } })
			.then((result) => {
				console.log(result);
				resolve(result);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
users.delete = async () => {
	return new Promise((resolve, reject) => {
		User.destroy({
			where: {},
		})
			.then((d) => resolve(d))
			.catch((err) => reject(err));
	});
};
users.deleteOne = async (id) => {
	return new Promise((resolve, reject) => {
		User.destroy({
			where: { id: id },
		})
			.then((d) => resolve(d))
			.catch((err) => reject(err));
	});
};
users.findAll = async () => {
	return new Promise((resolve, reject) => {
		User.findAll()
			.then((users) => resolve(users))
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
users.findOne = async (id) => {
	return new Promise((resolve, reject) => {
		User.findOne({
			where: {
				id: id,
			},
		})
			.then((user) => resolve(user))
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
//Communities util

communities.add = async (data) => {
	return new Promise((resolve, reject) => {
		Community.create(data)
			.then((community) => {
				resolve(community);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
communities.update = async (data, id) => {
	return new Promise((resolve, reject) => {
		Community.update(data, { where: { id: id } })
			.then((result) => {
				console.log(result);
				resolve(result);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
communities.delete = async () => {
	return new Promise((resolve, reject) => {
		Community.destroy({
			where: {},
		})
			.then((d) => resolve(d))
			.catch((err) => reject(err));
	});
};
communities.deleteOne = async (id) => {
	return new Promise((resolve, reject) => {
		Community.destroy({
			where: { id: id },
		})
			.then((d) => resolve(d))
			.catch((err) => reject(err));
	});
};
communities.findAll = async () => {
	return new Promise((resolve, reject) => {
		Community.findAll()
			.then((communities) => resolve(communities))
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
communities.findOne = async (id) => {
	return new Promise((resolve, reject) => {
		Community.findOne({
			where: {
				id: id,
			},
		})
			.then((community) => resolve(community))
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
const syncTables = async () => {
	await User.sync({ force: true });
	await Community.sync({ force: true });
};

module.exports = { users, communities, syncTables };
