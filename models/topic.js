const connection = require("../db/connection");

exports.getTopicsData = () => {
  return connection
    .select("*")
    .from("topics")
    .returning("*");
};
