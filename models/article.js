const connection = require("../db/connection");

exports.getarticlesData = ({ author, topic, sort_by, order }) => {
  //console.log(author);
  let query = connection
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
  articles;
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

exports.getArticlesComments = ({ article_id, sort_by, order }) => {
  let query = connection
    // .from("comments")
    // .select("comments.*")
    // .leftJoin("articles", "comments.article_id", "articles.article_id")
    // .where("comments.article_id", article_id)
    // .groupBy(
    //   "comments.comment_id",
    //   "comments.votes",
    //   "comments.created_at",
    //   "comments.author",
    //   "comments.body"
    // )
    // .returning("*");<--- this works but in comments table we have a column article_id so we can use comments table and no need for this
    .from("comments")
    .select("comment_id", "votes", "created_at", "author", "body")
    .where("comments.article_id", article_id);
  if (sort_by === undefined && order === undefined) {
    query.orderBy("comments.created_at", "desc");
  } else query.orderBy(sort_by, order);
  return query;
};

exports.insertCommentsByArticleID = ({ article_id }, newCommentData) => {
  console.log(newCommentData);
  return connection
    .insert(newCommentData)
    .where("comments.article_id", article_id)
    .into("comments")
    .returning("*");
};
