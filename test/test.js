const chai = require("chai"),
	should = chai.should(),
	expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../app");
const Community = require("../models/Community");
const User = require("../models/User");
const util = require("../util/api_util");
chai.use(chaiHttp);
var userId;

describe("Budo API", () => {
	describe("users Api", () => {
		/**
		 * Test the GET route
		 */
		describe("GET /users", () => {
			it("It should GET all the users", (done) => {
				chai.request(server)
					.get("/users")
					.end((err, response) => {
						console.log(response.body);
						response.should.have.status(200);
						response.body.should.be.a("array");
						// response.body.to.not.be.undefined;
						expect(response.body.length).to.not.equal(0);
						let user = response.body[0];
						expect(user).to.exist;
						expect(user).to.have.a.property("id");
						expect(user).to.have.a.property("username");
						expect(user).to.have.a.property("walletAddress");
						done();
					});
			});
		});

		/**
		 * Test the POST route
		 */
		describe("POST /users/add", () => {
			it("It should POST a new user", (done) => {
				const user = {
					username: "RandomUser1",
					email: "user1@mail.com",
					walletAddress: "72cb01ki-f723-442a-876c-ac76abae17dd",
					bio: "new bioooooo",
					profilePictureUrl: "stringasd",
					createdBy: "5b0c790a-d664-4ff5-857f-a46467fa97be",
					updatedBy: "5b0c790a-d664-4ff5-857f-a46467fa97be",
				};
				chai.request(server)
					.post("/users/add")
					.send(user)
					.end((err, response) => {
						response.should.have.status(200);
						expect(response.body).to.exist;
						response.body.should.be.a("object");
						response.body.should.have.property("id");
						response.body.should.have.property("username").eq("RandomUser1");
						userId = response.body.id;
						done();
					});
			});
		});

		/**
		 * Test the GET (by id) route
		 */
		describe("GET /users/:id", () => {
			it("It should GET a user by ID", (done) => {
				// const userId = "822b3f8a-62b5-4f61-8fae-5ecc5660a769";

				chai.request(server)
					.get("/users/" + userId)
					.end((err, response) => {
						response.should.have.status(200);
						response.body.should.be.a("object");
						response.body.should.have.property("id");
						response.body.should.have.property("username");
						response.body.should.have.property("email");
						response.body.should.have.property("walletAddress");
						response.body.should.have.property("id").eq(userId);
						done();
					});
			});
		});
		//
		/**
		 * Test the PUT route
		 */
		describe("PUT /users/:id/update", () => {
			it("It should PUT an existing user", (done) => {
				// const userId = "5a444eff-bd69-497c-8449-09d2a3deeddf";
				const user = {
					username: "RandomUser2updated",
					email: "user2updated@mail.com",
					walletAddress: "72cb01kb-f713-333a-876c-ac76abae17dd",
					bio: "updated bio",
				};
				chai.request(server)
					.put(`/users/${userId}/update`)
					.send(user)
					.end((err, response) => {
						response.should.have.status(200);
						User.findOne({
							where: {
								id: userId,
							},
						})
							.then((res) => {
								res.body.should.be.a("object");
								res.body.should.have.property("id").eq(userId);
								res.body.should.have.property("username").eq("RandomUser2updated");
								res.body.should.have.property("email").eq("user2updated@mail.com");
								res.body.should.have.property("walletAddress").eq("72cb01kb-f713-333a-876c-ac76abae17dd");
								res.body.should.have.property("bio").eq("updated bio");
							})
							.catch((err) => console.log(err));
						done();
					});
			});
		});
		/**
		 * Test the DELETE route
		 */
		// describe("DELETE /users/delete", () => {
		// 	it("It should DELETE all existing users", (done) => {
		// 		chai.request(server)
		// 			.delete("/users/delete")
		// 			.end((err, response) => {
		// 				response.should.have.status(200);
		// 				done();
		// 			});
		// 	});
		// });
		describe("DELETE /users/delete/:id", () => {
			it("It should DELETE an existing user", (done) => {
				// let userId = "5a444eff-bd69-497c-8449-09d2a3deeddf";
				chai.request(server)
					.delete("/users/delete/" + userId)
					.end((err, response) => {
						response.should.have.status(200);
						done();
					});
			});
		});
	});
	var communityId;
	describe("communities Api", () => {
		describe("GET /communities", () => {
			it("It should GET all the communities", (done) => {
				chai.request(server)
					.get("/communities")
					.end((err, response) => {
						console.log(response.body);
						response.should.have.status(200);
						response.body.should.be.a("array");
						// response.body.to.not.be.undefined;
						expect(response.body.length).to.not.equal(0);
						let user = response.body[0];
						expect(user).to.exist;
						expect(user).to.have.a.property("id");
						expect(user).to.have.a.property("name");
						expect(user).to.have.a.property("slug");
						expect(user).to.have.a.property("description");
						done();
					});
			});
		});

		/**
		 * Test the POST route
		 */
		describe("POST /communities/add", () => {
			it("It should POST a new community", (done) => {
				const community = {
					name: "a Community2",
					slug: "a slug2",
					description:
						"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteratdfssdfion in some form, by injected humour,",
					logoUrl: "new bsdfssio",
					websiteUrl: "strsdfing",
					primaryColor: "green",
					secondaryColor: "black",
					createdBy: "5a444eff-bd69-497c-8449-09d2a3deeddf",
					updatedBy: "5a444eff-bd69-497c-8449-09d2a3deeddf",
				};
				chai.request(server)
					.post("/communities/add")
					.send(community)
					.end((err, response) => {
						response.should.have.status(200);
						expect(response.body).to.exist;
						response.body.should.be.a("object");
						response.body.should.have.property("id");
						response.body.should.have.property("name").eq("a Community2");
						response.body.should.have.property("slug").eq("a slug2");
						communityId = response.body.id;
						done();
					});
			});
		});

		/**
		 * Test the GET (by id) route
		 */
		describe("GET /communities/:id", () => {
			it("It should GET a community by ID", (done) => {
				// const communityId = "89ee6c4a-f271-4773-81c7-91b15db72fc3";

				chai.request(server)
					.get("/communities/" + communityId)
					.end((err, response) => {
						response.should.have.status(200);
						response.body.should.be.a("object");
						response.body.should.have.property("id");
						response.body.should.have.property("name");
						response.body.should.have.property("slug");
						response.body.should.have.property("description");
						response.body.should.have.property("id").eq(communityId);
						done();
					});
			});
		});
		//
		/**
		 * Test the PUT route
		 */
		describe("PUT /communities/:id/update", () => {
			it("It should PUT an existing community", (done) => {
				// const communityId = "89ee6c4a-f271-4773-81c7-91b15db72fc3";
				const community = {
					name: "a Community updated",
					slug: "a slug updated",
					websiteUrl: "www.pic.com",
				};
				chai.request(server)
					.put(`/communities/${communityId}/update`)
					.send(community)
					.end((err, response) => {
						response.should.have.status(200);
						Community.findOne({
							where: {
								id: communityId,
							},
						})
							.then((res) => {
								res.body.should.be.a("object");
								res.body.should.have.property("id").eq(communityId);
								res.body.should.have.property("name").eq("a Community updated");
								res.body.should.have.property("slug").eq("a slug updated");
								res.body.should.have.property("websiteUrl").eq("www.pic.com");
							})
							.catch((err) => console.log(err));
						done();
					});
			});
		});
		/**
		 * Test the DELETE route
		 */
		describe("DELETE /users/delete/:id", () => {
			it("It should DELETE an existing user", (done) => {
				// let communityId = "89ee6c4a-f271-4773-81c7-91b15db72fc3";
				chai.request(server)
					.delete("/users/delete/" + communityId)
					.end((err, response) => {
						response.should.have.status(200);
						done();
					});
			});
		});
	});
});
