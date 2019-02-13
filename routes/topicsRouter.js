const topicsRouter = require("express").Router();
const { sendAlltopics, postTopic } = require("../controllers/topic");

topicsRouter
  .route("/")
  .get(sendAlltopics)
  .post(postTopic);

module.exports = topicsRouter;
