const { getTopicsData, addTopic } = require('../models/topic');

exports.sendAlltopics = (req, res, next) => {
  getTopicsData()
    .then(topics => res.status(200).send({ topics }))
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  addTopic(req.body)
    .then((topic) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};
