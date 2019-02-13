const connection = require("../db/connection");

exports.getarticlesData = ({ author, topic, sort_by, order }) => {
  //console.log(author);
  let query = connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count("comments.article_id")
    .groupBy(
      "articles.author",
      "articles.body",
      "articles.title",
      "articles.article_id",
      "articles.votes",
      "articles.created_at",
      "articles.topic"
    );
  if (author !== undefined) {
    query.where("articles.author", author);
  }
  if (topic !== undefined) {
    query.where("articles.topic", topic);
  }

  if (sort_by === undefined && order === undefined) {
    query.orderBy("articles.created_at", "desc");
  } else query.orderBy(sort_by, order);

  return query;
};

exports.insertArticleData = newArticleData => {
  return connection
    .insert(newArticleData)
    .into("articles")
    .returning("*");
};
