const topicsRouter = require('express').Router();
const { handle405 } = require('../errors/errorHandler');
const { sendAlltopics, postTopic } = require('../controllers/topic');

topicsRouter
  .route('/')
  .get(sendAlltopics)
  .post(postTopic)
  .all(handle405);

module.exports = topicsRouter;
