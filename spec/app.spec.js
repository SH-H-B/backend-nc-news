process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() =>
    connection.migrate
      .rollback()
      .then(() => connection.migrate.latest())
      .then(() => connection.seed.run())
  );

  after(() => connection.destroy());

  it('GET 404 responds with 404 and "Page not found" error message', () =>
    request
      .get("/ap/")
      .expect(404)
      .then(res => {
        // console.log("ok");
        expect(res.body.msg).to.equal("Page not found");
      }));
  it("GET 200 responds with an object", () =>
    request
      .get("/api")
      .expect(200)
      .then(res => {
        // console.log(res.body);
        expect(res.body).to.be.an("object");
        expect(res.body).contain.key("/api");
      }));

  describe("/topics", () => {
    it("GET : responds with a status 200", () =>
      request.get("/api/topics").expect(200));
    it("GETS: status:200 and responds with an array of topics objects", () =>
      request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          // console.log(res.body.topics);

          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics[0]).contain.keys("slug", "description");
        }));
    it("POST, status:201 and response with posted topic object", () => {
      const topic = {
        description: "I wish I could have you forever",
        slug: "shiva"
      };
      return request
        .post("/api/topics")
        .expect(201)
        .send(topic)
        .then(res => {
          // console.log(res.body);
          expect(res.body.topic[0]).to.be.an("object");
          expect(res.body.topic[0].slug).to.eql("shiva");
        });
    });
    it("POST, status:404 and response with undefined column", () => {
      const newTopic = {
        sss: "I wish I could have you forever",
        slug: "shiva"
      };
      return request
        .post("/api/topics")
        .expect(400)
        .send(newTopic)
        .then(res => {
          expect(res.body.msg).to.equal("Undefined Column");
          // expect(res.body.newTopicData[0].slug).to.eql("shiva");
        });
    });
    it("Post status 422 with Key alredy exist", () => {
      const badTopic = {
        slug: "cats",
        description: "All about cats!"
      };
      return request
        .post("/api/topics")
        .send(badTopic)
        .expect(422)
        .then(res => {
          expect(res.body.msg).to.equal("Key Already Exists");
        });
    });
    it("POST: status 400 with violates not null violation", () => {
      const badTopic = {
        description: "All about me!"
      };
      return request
        .post("/api/topics")
        .send(badTopic)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("violates not null violation");
        });
    });
    it("POST: status 400 with violates not null violation", () => {
      const badTopic = {
        slug: "sky"
      };
      return request
        .post("/api/topics")
        .send(badTopic)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("violates not null violation");
        });
    });
    it("DELETE/PATCH/PUT: returns 405 if an invalid method is selected", () =>
      request
        .patch("/api/topics")
        .expect(405)
        .then(res => expect(res.body.msg).to.equal("Method Not Allowed")));
  });

  describe("/articles", () => {
    it("GET : responds with a 200 status", () =>
      request.get("/api/articles").expect(200));
    it("GET: status 200 and response with and array of article object", () =>
      request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          // console.log(res.body.articles[0].count);
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0].comment_count).to.eql("13");
          expect(res.body.articles[0]).contain.key("comment_count");
        }));
    it("GET: status 200 and response with and array of article object with specific author", () =>
      request
        .get("/api/articles?author=rogersop")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0].author).to.eql("rogersop");
          expect(res.body.articles[1].author).to.eql("rogersop");
        }));
    it("GET: status 200 and response with and array of article object with specific author", () =>
      request
        .get("/api/articles?author=jehgfsj")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Article Not Found");
        }));

    it("GET: status 200 and response with and array of article object with specific topic", () =>
      request
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(res => {
          // console.log(res.body.articles);
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[3].topic).to.eql("mitch");
        }));
    it("GET: status 200 and response with and array of custom sorted article object ", () =>
      request
        .get("/api/articles?sort_by=topic&order=asc")
        .expect(200)
        .then(res => {
          // console.log(res.body.articles);
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0].topic).to.eql("cats");
        }));
    it("GET status:200 takes sort_by query which alters the column by which data is sorted (DEFAULT order=desc)", () =>
      request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          //console.log(res.body);
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0].created_at).to.equal(
            "2018-11-15T00:00:00.000Z"
          );
        }));
    it("GET status:200 takes a order query which changes the sort to ascending (DEFAULT sort_by=created_at)", () =>
      request
        .get("/api/articles/?order=asc")
        .expect(200)
        .then(res => {
          //console.log(res.body);
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0].created_at).to.equal(
            "1974-11-26T00:00:00.000Z"
          );
        }));
    it("GET status:200 will ignore an invalid sort_by query", () =>
      request
        .get("/api/articles/?sort_by=hajaja")
        .expect(200)
        .then(res => {
          // console.log(res.body.articles[0]);
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0].created_at).to.equal(
            "2018-11-15T00:00:00.000Z"
          );
        }));
    it("GET:status404 and  response with Not Found", () =>
      request
        .get("/api/65")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Page not found");
        }));

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
          // console.log(res.body);
          expect(res.body.article).to.be.an("object");
          expect(res.body.article).contain.keys(
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
    it("post status 400 with violates not null violation response ", () => {
      const newArticleData = {};
      return request
        .post("/api/articles")
        .expect(400)
        .send(newArticleData)
        .then(res => {
          expect(res.body.msg).to.equal("violates not null violation");
        });
    });
    it("Post status 422 with Undefined Column", () => {
      const badTopic = {
        slug: "cats",
        description: "All about cats!"
      };
      return request
        .post("/api/articles")
        .send(badTopic)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("Undefined Column");
        });
    });
    it("GET: status 200 and response with and single article object by specific ID ", () =>
      request
        .get("/api/articles/2")
        .expect(200)
        .then(res => {
          // console.log(res.body.articles);
          expect(res.body.article).to.be.an("object");
          expect(res.body.article.title).to.eql("Sony Vaio; or, The Laptop");
          expect(res.body.article).contain.key("comment_count");
        }));
    it("GET: status 404 and response with Article not found ", () =>
      request
        .get("/api/articles/10000")
        .expect(404)
        .then(res => {
          // console.log(res.body.articles);
          expect(res.body.msg).to.equal("Article not found");
        }));
    it("GET: status 400 and response with invalid input syntax for type integer ", () =>
      request
        .get("/api/articles/abc")
        .expect(400)
        .then(res => {
          // console.log(res.body.articles);
          expect(res.body.msg).to.equal(
            "invalid input syntax for type integer"
          );
        }));
    it("PATCH, status:202 and response with updated single article's votes object", () => {
      const newVote = {
        inc_votes: -1
      };
      return request
        .patch("/api/articles/1")
        .expect(200)
        .send(newVote)
        .then(res => {
          // console.log(res.body);
          expect(res.body.article).to.be.an("object");
          expect(res.body.article.votes).to.eql(99);
        });
    });
    it("PATCH, status:202 and response with updated single article's votes object", () => {
      const newVote = {
        inc_votes: 5
      };
      return request
        .patch("/api/articles/1")
        .expect(200)
        .send(newVote)
        .then(res => {
          // console.log(res.body);
          expect(res.body.article).to.be.an("object");
          expect(res.body.article.votes).to.eql(105);
        });
    });
    it("PATCH, status:400 and response with invalid input syntax for type integer", () => {
      const newVote = {
        inc_votes: -1
      };
      return request
        .patch("/api/articles/bc")
        .expect(400)
        .send(newVote)
        .then(res => {
          expect(res.body.msg).to.equal(
            "invalid input syntax for type integer"
          );
        });
    });
    it("PATCH: status 200 if patch input data does not have body and returns unmodifed article", () =>
      request
        .patch("/api/articles/3")
        .send({})
        .expect(200));
    it("PATCH method returns status 400 if client tries to update vote with an incorrect data type", () => {
      const newVote = { inc_votes: "text" };
      request
        .patch("/api/articles/1")
        .send(newVote)
        .expect(400);
    });
    it("DELETE, status:204 it  delete the given article by `article_id`", () =>
      request
        .delete("/api/articles/1")
        .expect(204)
        .then(res => {
          expect(res.body).to.eql({});
        }));
    it("DELETE, status:404 when the article_id does not exist", () =>
      request
        .delete("/api/articles/1000")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.eql("Article not found");
        }));
    it("DELETE/PATCH/PUT: returns 405 if an invalid method is selected", () =>
      request
        .patch("/api/articles")
        .expect(405)
        .then(res => expect(res.body.msg).to.equal("Method Not Allowed")));
    it("POST: returns 405 if an invalid method is selected", () =>
      request
        .post("/api/articles/2")
        .expect(405)
        .then(res => expect(res.body.msg).to.equal("Method Not Allowed")));
    it("GET: status 200 and response with array of comments object for the given `article_id`", () =>
      request
        .get("/api/articles/6/comments")
        .expect(200)
        .then(res => {
          // console.log(res.body.comments);
          expect(res.body.comments).to.be.an("array");
          expect(res.body.comments[0]).contain.keys(
            "article_id",
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body"
          );

          expect(res.body.comments[0].body).to.equal(
            "This is a bad article name"
          );
        }));
    it("GET status:200 can be sorted by author (DEFAULT order=desc)", () =>
      request
        .get("/api/articles/6/comments/?sort_by=author")
        .expect(200)
        .then(res => {
          // console.log(res.body.comments);
          expect(res.body.comments).to.be.an("array");
          expect(res.body.comments[0].author).to.eql("butter_bridge");
        }));
    it("GET status:200 can be sorted by votes (DEFAULT order=desc)", () =>
      request
        .get("/api/articles/6/comments/?sort_by=votes")
        .expect(200)
        .then(res => {
          // console.log(res.body.comments);
          expect(res.body.comments).to.be.an("array");
          expect(res.body.comments[0].votes).to.equal(1);
        }));
    it("GET status:200 can change the sort order (DEFAULT sort_by=created_at)", () =>
      request
        .get("/api/articles/6/comments/?order=asc")
        .expect(200)
        .then(res => {
          // console.log(res.body.comments);
          expect(res.body.comments).to.be.an("array");
          expect(res.body.comments[0].created_at).to.eql(
            "2002-11-26T00:00:00.000Z"
          );
        }));
    it("GET: status 404 and response for non-existent article id", () => {
      return request
        .get("/api/articles/1000/comments")
        .expect(404)
        .then(res => {
          //console.log(res.body.msg);
          expect(res.body.msg).to.equal("Article not found");
        });
    });
    it("POST, status:201 and response with single posted comment object", () => {
      const newComment = {
        author: "rogersop",
        body: "I am so proud of my codes"
      };
      return request
        .post("/api/articles/6/comments")
        .expect(201)
        .send(newComment)
        .then(res => {
          // console.log(res.body);
          expect(res.body.comment).to.be.an("object");
          expect(res.body.comment.body).to.equal("I am so proud of my codes");
          expect(res.body.comment).contain.keys("author", "body");
        });
    });
    it("post: status 404 and response for non-existent article id", () => {
      return request
        .post("/api/articles/1000/comments")
        .expect(404)
        .then(res => {
          //console.log(res.body.msg);
          expect(res.body.msg).to.equal("Article not found");
        });
    });
    it("POST, status:400 and response with violates not null violation", () => {
      const newComment = {
        author: "rogersop"
      };
      return request
        .post("/api/articles/6/comments")
        .expect(400)
        .send(newComment)
        .then(res => {
          expect(res.body.msg).to.equal("violates not null violation");
          ("I am so proud of my codes");
        });
    });
  });

  describe("/comments/:comment_id", () => {
    it("PATCH status:200 and an updated comment when given a body including a valid inc_votes (VOTE DOWN)", () => {
      const newVote = {
        inc_votes: -1
      };
      return request
        .patch("/api/comments/2")
        .expect(200)
        .send(newVote)
        .then(res => {
          expect(res.body.comment).to.be.an("object");
          expect(res.body.comment.votes).to.eql(13);
        });
    });
    it("DELETE, status:204 it  delete the given comment by `comment_id` with no content", () =>
      request
        .delete("/api/comments/2")
        .expect(204)
        .then(res => {
          expect(res.body).to.eql({});
        }));
    it("PATCH: status 200 if patch input data does not have body and returns unmodifed article", () =>
      request
        .patch("/api/comments/3")
        .send({})
        .expect(200));
    it("PATCH method returns status 400 if client tries to update vote with an incorrect data type", () => {
      const newVote = { inc_votes: "text" };
      request
        .patch("/api/articles/1/comments/2")
        .send(newVote)
        .expect(400);
    });
    it("PATCH: responds with 404 if passed a comment id that does not exist", () => {
      const newVote = { inc_votes: 12 };
      return request
        .patch("/api/comments/19820921")
        .send(newVote)
        .expect(404)
        .then(res => expect(res.body.msg).to.equal("Comment Does Not Exist"));
    });
    it("Delete: responds with 404 if passed a comment id that does not exist", () => {
      const newVote = { inc_votes: 12 };
      return request
        .delete("/api/comments/19820929")
        .send(newVote)
        .expect(404)
        .then(res => expect(res.body.msg).to.equal("Comment Does Not Exist "));
    });
    it("POST/PUT/GET: returns 405 if an invalid method is selected", () =>
      request.get("/api/comments/7").expect(405));
  });
  describe("/users", () => {
    it("GET: responds with a 200 status", () =>
      request.get("/api/users").expect(200));
    it("GETS: status:200 and responds with an array of users objects", () =>
      request
        .get("/api/users")
        .expect(200)
        .then(res => {
          expect(res.body.users).to.be.an("array");
          expect(res.body.users[0]).contain.keys(
            "username",
            "avatar_url",
            "name"
          );
        }));
    it("POST, status:201 and response with posted user object", () => {
      const newUser = {
        username: "Ramtin",
        name: "shiva",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4"
      };
      return request
        .post("/api/users")
        .expect(201)
        .send(newUser)
        .then(res => {
          // console.log(res.body);
          expect(res.body.user).to.be.an("object");
          expect(res.body.user.name).to.eql("shiva");
        });
    });
    it("GET, status 200 and response with a  single user object ", () =>
      request
        .get("/api/users/icellusedkars")
        .expect(200)
        .then(res => {
          expect(res.body.user).to.be.an("object");
          expect(res.body.user.name).to.eql("sam");
        }));
    it("GET, status 404 and response with user not found ", () =>
      request
        .get("/api/users/asghar")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("user not found");
        }));
    it("POST: responds with 422 if user is added and username already exists", () => {
      const newUser = {
        username: "rogersop",
        avatar_url: "www.test.com/jpg",
        name: "Mark"
      };
      return request
        .post("/api/users")
        .send(newUser)
        .expect(422);
    });
    it("DELETE/PATCH/PUT: returns 405 if an invalid method is selected", () =>
      request
        .delete("/api/users")
        .expect(405)
        .then(res => expect(res.body.msg).to.equal("Method Not Allowed")));
    it("DELETE/PATCH/PUT: returns 405 if an invalid method is selected", () =>
      request
        .delete("/api/users/:username")
        .expect(405)
        .then(res => expect(res.body.msg).to.equal("Method Not Allowed")));
  });
});

// "app-test": "mocha spec/app.spec.js",
// - get rid of console.logs / unreachable code
