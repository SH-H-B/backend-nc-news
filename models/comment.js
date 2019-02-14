const connection = require("../db/connection");

exports.updateCommentVotes = ({ comment_id }, { newVote }) => {
  const query = connection.from("comments").where("comment_id", comment_id);

  if (newVote > 0) query.increment("votes", newVote);
  else {
    query.decrement("votes", newVote);
  }
  return query.returning("*");
};

exports.removeCommentByID = ({ comment_id }) => {
  return connection
    .from("comments")
    .where("comments.comment_id", "=", comment_id)
    .del();
};
