const usersRouter = require("express").Router();
const {
  sendAllusers,
  postUserData,
  sendUserByUsername
} = require("../controllers/user");
usersRouter
  .route("/")
  .get(sendAllusers)
  .post(postUserData);
usersRouter.route("/:username").get(sendUserByUsername);

module.exports = usersRouter;
