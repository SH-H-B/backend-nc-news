process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");

const connection = require("../db/connection");

describe("/api", () => {
  console.log("ok");
  beforeEach(() =>
    connection.migrate
      .rollback()
      .then(() => connection.migrate.latest())
      .then(() => connection.seed.run())
  );

  after(() => connection.destroy());

  describe("/topics", () => {
    it("GETS: status:200 and responds with an array of topics objects", () =>
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
          expect(res.body.newTopicData[0].slug).to.eql("shiva");
        });
    });
    it("POST, status:404 and response with undefined column", () => {
      const newTopicData = {
        sss: "I wish I could have you forever",
        slug: "shiva"
      };
      return request
        .post("/api/topics")
        .expect(400)
        .send(newTopicData)
        .then(res => {
          expect(res.body.msg).to.equal("Undefined Column");
          //expect(res.body.newTopicData[0].slug).to.eql("shiva");
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
          expect(res.body.articles[0].comment_count).to.eql("13");
          expect(res.body.articles[0]).contain.key("comment_count");
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
    it("GET: status 200 and response with and array of article object with specific topic", () => {
      return request
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(res => {
          //console.log(res.body.articles);
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[3].topic).to.eql("mitch");
        });
    });
    it("GET: status 200 and response with and array of custom sorted article object ", () => {
      return request
        .get("/api/articles?sort_by=topic&order=asc")
        .expect(200)
        .then(res => {
          //console.log(res.body.articles);
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0].topic).to.eql("cats");
        });
    });
    it("POST, status:201 and response with posted article object", () => {
      const newArticleData = {
        title: "test",
        body: "hellooooo and how are youoooooooooo",
        topic: "cats",
        author: "rogersop"
      };
      return request
        .post("/api/articles")
        .expect(201)
        .send(newArticleData)
        .then(res => {
          //console.log(res.body);
          expect(res.body.newInsertedArticleData).to.be.an("object");
          expect(res.body.newInsertedArticleData).contain.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at"
          );
        });
    });
    it("GET: status 200 and response with and single article object by specific ID ", () => {
      return request
        .get("/api/articles/2")
        .expect(200)
        .then(res => {
          //console.log(res.body.articles);
          expect(res.body.article).to.be.an("object");
          expect(res.body.article.title).to.eql("Sony Vaio; or, The Laptop");
          expect(res.body.article).contain.key("comment_count");
        });
    });
    it("GET: status 404 and response with Article not found ", () => {
      return request
        .get("/api/articles/10000")
        .expect(404)
        .then(res => {
          //console.log(res.body.articles);
          expect(res.body.msg).to.equal("Article not found");
        });
    });
    it("PATCH, status:202 and response with updated single article's votes object", () => {
      const newVote = {
        inc_votes: -1
      };
      return request
        .patch("/api/articles/1")
        .expect(200)
        .send(newVote)
        .then(res => {
          //console.log(res.body);
          expect(res.body.updatedArticle).to.be.an("object");
          expect(res.body.updatedArticle.votes).to.eql(99);
        });
    });
    it("DELETE, status:204 it  delete the given article by `article_id`", () => {
      return request
        .delete("/api/articles/1")
        .expect(204)
        .then(res => {
          expect(res.body).to.eql({});
        });
    });
    it("GET: status 200 and response with array of comments object for the given `article_id`", () => {
      return request
        .get("/api/articles/6/comments")
        .expect(200)
        .then(res => {
          //console.log(res.body.comments);
          expect(res.body.comments).to.be.an("array");
          expect(res.body.comments[0].body).to.equal(
            "This is a bad article name"
          );
        });
    });
    it("POST, status:201 and response with single posted comment object", () => {
      const newCommentData = {
        author: "rogersop",
        body: "I am so proud of my codes"
      };
      return request
        .post("/api/articles/6/comments")
        .expect(201)
        .send(newCommentData)
        .then(res => {
          //console.log(res.body);
          expect(res.body.newInsertedComment).to.be.an("object");
          expect(res.body.newInsertedComment.body).to.equal(
            "I am so proud of my codes"
          );
          expect(res.body.newInsertedComment).contain.keys("author", "body");
        });
    });
  });
  describe("/comments", () => {
    it("patch: status:200 and response with updated single comments's votes object", () => {
      const newVote = {
        inc_votes: -1
      };
      return request
        .patch("/api/comments/2")
        .expect(200)
        .send(newVote)
        .then(res => {
          expect(res.body.updatedComment).to.be.an("object");
          expect(res.body.updatedComment.votes).to.eql(13);
        });
    });
    it("DELETE, status:204 it  delete the given comment by `comment_id` with no content", () => {
      return request
        .delete("/api/comments/2")
        .expect(204)
        .then(res => {
          expect(res.body).to.eql({});
        });
    });
  });
  describe("/users", () => {
    it("GETS: status:200 and responds with an array of users objects", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(res => {
          expect(res.body.users).to.be.an("array");
          expect(res.body.users[0]).contain.keys(
            "username",
            "avatar_url",
            "name"
          );
        });
    });
    it("POST, status:201 and response with posted user object", () => {
      const newUserData = {
        username: "Ramtin",
        name: "shiva",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4"
      };
      return request
        .post("/api/users")
        .expect(201)
        .send(newUserData)
        .then(res => {
          //console.log(res.body);
          expect(res.body.newUserData).to.be.an("object");
          expect(res.body.newUserData.name).to.eql("shiva");
        });
    });
    it("GET, status 200 and response with a  single user object ", () => {
      return request
        .get("/api/users/icellusedkars")
        .expect(200)
        .then(res => {
          expect(res.body.user).to.be.an("object");
          expect(res.body.user.name).to.eql("sam");
        });
    });
  });
});
