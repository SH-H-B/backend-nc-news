const commentsRouter = require("express").Router();
const {
  patchCommentVotes,
  deleteCommentByID
} = require("../controllers/comment");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVotes)
  .delete(deleteCommentByID);

module.exports = commentsRouter;
