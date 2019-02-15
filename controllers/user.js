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
    .catch(next);
};

exports.postUserData = (req, res, next) => {
  addUserData(req.body)
    .then(([newUserData]) => {
      res.status(201).send({ newUserData });
    })
    .catch(next);
};

exports.sendUserByUsername = (req, res, next) => {
  getUserByUsername(req.params)
    .then(([user]) => {
      if (!user) return Promise.reject({ status: 404, msg: "user not found" });
      else return res.status(200).send({ user });
    })
    .catch(next);
};
