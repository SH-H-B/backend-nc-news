const connection = require("../db/connection");

exports.getarticlesData = ({ author, topic, sort_by, order }) => {
  //console.log(author);
  let query = connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count("comments.article_id as comment_count")
    //
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

exports.getArticleByID = ({ article_id }) => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count("comments.article_id as comment_count")
    .where("articles.article_id", article_id)
    .groupBy(
      "articles.author",
      "articles.body",
      "articles.title",
      "articles.article_id",
      "articles.votes",
      "articles.created_at",
      "articles.topic"
    );
};

exports.updateArticleVotes = ({ article_id }, { newVote }) => {
  //console.log(article_id);

  const query = connection.from("articles").where("article_id", article_id);

  if (newVote > 0) query.increment("votes", newVote);
  else {
    query.decrement("votes", newVote);
  }
  return query.returning("*");
};

exports.removeArticleByID = ({ article_id }) => {
  //first delete all relations then delete from actual table ( in this case articles)
  return connection
    .from("comments")
    .where("comments.article_id", "=", article_id)
    .del()
    .then(() => {
      return connection
        .from("articles")
        .del()
        .where("articles.article_id", "=", article_id);
    });
};
