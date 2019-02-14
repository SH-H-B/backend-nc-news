const { updateCommentVotes } = require("../models/comment");

exports.patchCommentVotes = (req, res, next) => {
  updateCommentVotes(req.params, req.body)
    .then(([updatedComment]) => {
      res.status(200).send({ updatedComment });
    })
    .catch(console.log);
};
