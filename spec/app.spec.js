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
          //console.log(res.body.topics);

          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics[0]).contain.keys("slug", "description");
        }));
    it("POST, status:201 and response with posted topic object", () => {
      const newTopicData = {
        description: "I wish I could have you forever",
        slug: "shiva"
      };
      return request
        .post("/api/topics")
        .expect(201)
        .send(newTopicData)
        .then(res => {
          //console.log(res.body);
          expect(res.body.newTopicData[0]).to.be.an("object");
          expect(res.body.newTopicData[0]).contain.keys("slug", "description");
        });
    });
  });

  describe("/articles", () => {
    it("GET: status 200 and response with and array of article object", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          //console.log(res.body.articles[0].count);
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0].count).to.eql("0");
        });
    });
    it("GET: status 200 and response with and array of article object with specific author", () => {
      return request
        .get("/api/articles?author=rogersop")
        .expect(200)
        .then(res => {
          //console.log(res.body.articles[0].count);
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0].author).to.eql("rogersop");
        });
    });
  });
});
