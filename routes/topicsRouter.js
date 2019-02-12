const topicsRouter = require("express").Router();
const { sendAlltopics } = require("../controllers/topic");

topicsRouter.route("/").get(sendAlltopics);

module.exports = topicsRouter;
