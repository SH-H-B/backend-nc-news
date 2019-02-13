const connection = require("../db/connection");

exports.getTopicsData = () => {
  return connection
    .select("*")
    .from("topics")
    .returning("*");
};

exports.addTopic = newTopicData => {
  //console.log(newTopicData);
  return connection
    .insert(newTopicData)
    .into("topics")
    .returning("*");
};
