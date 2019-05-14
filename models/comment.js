const connection = require('../db/connection');

exports.updateCommentVotes = ({ comment_id }, { inc_votes }) => {
  if (inc_votes === undefined) inc_votes = 0;
  const query = connection.from('comments').where('comment_id', comment_id);
  query.increment('votes', inc_votes);

  return query.returning('*');
};

exports.removeCommentByID = ({ comment_id }) => connection
  .from('comments')
  .where('comments.comment_id', '=', comment_id)
  .del();
