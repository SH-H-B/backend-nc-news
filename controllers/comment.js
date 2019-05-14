const { updateCommentVotes, removeCommentByID } = require('../models/comment');

exports.patchCommentVotes = (req, res, next) => {
  updateCommentVotes(req.params, req.body)
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({ status: 404, msg: 'Comment Does Not Exist' });
      }
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentByID = (req, res, next) => {
  removeCommentByID(req.params)
    .then((deleted) => {
      if (!deleted) {
        return Promise.reject({
          status: 404,
          msg: 'Comment Does Not Exist ',
        });
      }
      res.status(204).send({});
    })
    .catch(next);
};
