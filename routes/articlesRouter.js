const articlesRouter = require("express").Router();
const {
  sendArticlesData,
  postArticleData,
  sendArticleByID,
  patchArticleVotes,
  deleteArticleByID
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

module.exports = articlesRouter;
