const commentsRouter = require('express').Router();
const { handle405 } = require('../errors/errorHandler');
const {
  patchCommentVotes,
  deleteCommentByID,
} = require('../controllers/comment');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentVotes)
  .delete(deleteCommentByID)
  .all(handle405);

module.exports = commentsRouter;
