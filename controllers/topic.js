const { getTopicsData, addTopic } = require("../models/topic");

exports.sendAlltopics = (req, res, next) => {
  //
  getTopicsData()
    .then(topics => res.status(200).send({ topics }))
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  addTopic(req.body)
    .then(newTopicData => {
      res.status(201).send({ newTopicData });
    })
    .catch(next);
};
