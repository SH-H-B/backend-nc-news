const articlesRouter = require("express").Router();
const {
  sendArticlesData,
  postArticleData,
  sendArticleByID,
  patchArticleVotes,
  deleteArticleByID,
  sendArticlesComments
} = require("../controllers/article");

articlesRouter
  .route("/")
  .get(sendArticlesData)
  .post(postArticleData);
articlesRouter
  .route("/:article_id")
  .get(sendArticleByID)
  .patch(patchArticleVotes)
  .delete(deleteArticleByID);
articlesRouter.route("/:article_id/comments").get(sendArticlesComments);

module.exports = articlesRouter;
