const { updateCommentVotes, removeCommentByID } = require("../models/comment");

exports.patchCommentVotes = (req, res, next) => {
  updateCommentVotes(req.params, req.body)
    .then(([updatedComment]) => {
      res.status(200).send({ updatedComment });
    })
    .catch(next);
};

exports.deleteCommentByID = (req, res, next) => {
  removeCommentByID(req.params)
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};
