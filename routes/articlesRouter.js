const articlesRouter = require("express").Router();
const {
  sendArticlesData,
  postArticleData,
  sendArticleByID
} = require("../controllers/article");

articlesRouter
  .route("/")
  .get(sendArticlesData)
  .post(postArticleData);
articlesRouter.route("/:article_id").get(sendArticleByID);

module.exports = articlesRouter;
