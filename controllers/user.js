const {
  getUsersData,
  addUserData,
  getUserByUsername,
} = require('../models/user');

exports.sendAllusers = (req, res, next) => {
  getUsersData()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.postUserData = (req, res, next) => {
  addUserData(req.body)
    .then(([user]) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.sendUserByUsername = (req, res, next) => {
  getUserByUsername(req.params)
    .then(([user]) => {
      if (!user) return Promise.reject({ status: 404, msg: 'user not found' });
      return res.status(200).send({ user });
    })
    .catch(next);
};
