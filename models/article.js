const connection = require("../db/connection");

exports.getarticlesData = ({
  author,
  topic,
  sort_by = "created_at",
  order = "desc"
}) => {
  const query = connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count("comments.article_id as comment_count")
    .groupBy(
      "articles.author",
      "articles.body",
      "articles.title",
      "articles.article_id",
      "articles.votes",
      "articles.created_at",
      "articles.topic"
    )
    .orderBy(sort_by, order);
  if (author) {
    query.where("articles.author", author);
  }
  // check if whether
  if (topic) {
    query.where("articles.topic", topic);
  }

  return query;
};

exports.insertArticleData = newArticleData =>
  connection
    .insert(newArticleData)
    .into("articles")
    .returning("*");

exports.getArticleByID = ({ article_id }) =>
  connection
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

exports.updateArticleVotes = ({ article_id }, { inc_votes }) => {
  if (inc_votes === undefined) inc_votes = 0;
  const query = connection.from("articles").where("article_id", article_id);
  query.increment("votes", inc_votes);

  return query.returning("*");
};

exports.removeArticleByID = ({ article_id }) =>
  connection
    .from("comments")
    .where("comments.article_id", "=", article_id)
    .del()
    .then(() =>
      connection
        .from("articles")
        .del()
        .where("articles.article_id", "=", article_id)
    );
exports.getArticlesComments = (
  { article_id },
  { sort_by = "created_at", order = "desc" }
) => {
  const query = connection

    .from("comments")
    .select("article_id", "comment_id", "votes", "created_at", "author", "body")
    .where("comments.article_id", article_id)
    .orderBy(sort_by, order);
  return query;
};

exports.insertCommentsByArticleID = ({ article_id }, { author, body }) => {
  return connection
    .insert({ article_id: article_id, author: author, body: body })
    .into("comments")
    .returning("*");
};
