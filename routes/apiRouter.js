const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');
const commentsRouter = require('./commentsRouter');
const usersRouter = require('./usersRouter');
const { getEndPoints } = require('../controllers/api');
const { handle405 } = require('../errors/errorHandler');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);
apiRouter
  .route('/')
  .get(getEndPoints)
  .all(handle405);

module.exports = apiRouter;
