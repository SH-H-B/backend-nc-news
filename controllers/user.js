const {
  getUsersData,
  addUserData,
  getUserByUsername
} = require("../models/user");

exports.sendAllusers = (req, res, next) => {
  getUsersData()
    .then(users => {
      //console.log(users);
      res.status(200).send({ users });
    })
    .catch(console.log);
};

exports.postUserData = (req, res, next) => {
  addUserData(req.body)
    .then(([newUserData]) => {
      res.status(201).send({ newUserData });
    })
    .catch(console.log);
};

exports.sendUserByUsername = (req, res, next) => {
  getUserByUsername(req.params)
    .then(([user]) => {
      //console.log(user);
      res.status(200).send({ user });
    })
    .catch(console.log);
};
