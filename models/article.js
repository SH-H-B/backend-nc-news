const connection = require("../db/connection");

exports.getarticlesData = author => {
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
  if (author !== undefined && author !== "") {
    query.where("articles.author", author);
  }

  return query;
};
//
