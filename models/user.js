const connection = require("../db/connection");

exports.getUsersData = () => {
  return connection
    .select("*")
    .from("users")
    .returning("*");
};

exports.addUserData = newUserData => {
  return connection
    .insert(newUserData)
    .into("users")
    .returning("*");
};

exports.getUserByUsername = ({ username }) => {
  // console.log(
  //   connection
  //     .select("*")
  //     .from("users")
  //     .where("username", "=", username)
  //     .returning("*")
  // );
  return connection
    .select("*")
    .from("users")
    .where("username", "=", username)
    .returning("*");
};
