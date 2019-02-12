process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");

const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() =>
    connection.migrate
      .rollback()
      .then(() => connection.migrate.latest())
      .then(() => connection.seed.run())
  );

  after(() => connection.destroy());

  describe("/topics", () => {
    it("GETS: status:200 and responds with an array of topics object", () =>
      request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics[0]).contain.keys("slug", "description");
        }));
  });
});
