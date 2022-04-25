import request from "supertest";
import {expect} from "chai"
import dotenv from "dotenv";
import server from "../../server.js"
dotenv.config('../../.env')


const tempUser = {
  name: process.env.USER_TEST,
  password: process.env.USER_TEST_PASSWORD,
};

before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
});

describe("POST users", () => {
  it("should register new user with valid credentials", (done) => {
    request(server)
      .post("/api/users/add-user")
      .send(tempUser)
      .expect(201)
      .then((res) => {
        expect(res.body.message).to.be.eql("User Created");
        done();
      })
      .catch((err) => done(err));
  });

  it("shouldn't accept the name that already exists in the database", (done) => {
    request(server)
      .post("/api/users/add-user")
      .send(tempUser)
      .expect(400)
      .then((res) => {
        expect(res.body.message).to.be.eql("User is already in use");
        done();
      })
      .catch((err) => done(err));
  });
});
