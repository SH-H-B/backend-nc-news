const articlesRouter = require('express').Router();
const { handle405 } = require('../errors/errorHandler');
const {
  sendArticlesData,
  postArticleData,
  sendArticleByID,
  patchArticleVotes,
  deleteArticleByID,
  sendArticlesComments,
  postCommentByarticleID,
} = require('../controllers/article');

articlesRouter
  .route('/')
  .get(sendArticlesData)
  .post(postArticleData)
  .all(handle405);
articlesRouter
  .route('/:article_id')
  .get(sendArticleByID)
  .patch(patchArticleVotes)
  .delete(deleteArticleByID)
  .all(handle405);
articlesRouter
  .route('/:article_id/comments')
  .get(sendArticlesComments)
  .post(postCommentByarticleID)
  .all(handle405);

module.exports = articlesRouter;
