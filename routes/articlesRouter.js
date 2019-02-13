const articlesRouter = require("express").Router();
const { sendArticlesData, postArticleData } = require("../controllers/article");

articlesRouter
  .route("/")
  .get(sendArticlesData)
  .post(postArticleData);

module.exports = articlesRouter;
