const usersRouter = require('express').Router();
const { handle405 } = require('../errors/errorHandler');
const {
  sendAllusers,
  postUserData,
  sendUserByUsername,
} = require('../controllers/user');

usersRouter
  .route('/')
  .get(sendAllusers)
  .post(postUserData)
  .all(handle405);
usersRouter
  .route('/:username')
  .get(sendUserByUsername)
  .all(handle405);

module.exports = usersRouter;
