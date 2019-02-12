const { getTopicsData } = require("../models/topic");

exports.sendAlltopics = (req, res, next) => {
  //
  getTopicsData()
    .then(topics => res.status(200).send({ topics }))
    .catch(next);
};
