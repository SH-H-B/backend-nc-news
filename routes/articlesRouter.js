const articlesRouter = require("express").Router();
const { sendArticlesData } = require("../controllers/article");

articlesRouter.route("/").get(sendArticlesData);

module.exports = articlesRouter;
