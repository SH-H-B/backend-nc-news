const {
  getarticlesData,
  insertArticleData,
  getArticleByID,
  updateArticleVotes,
  removeArticleByID,
  getArticlesComments,
  insertCommentsByArticleID
} = require("../models/article");

exports.sendArticlesData = (req, res, next) => {
  getarticlesData(req.query)
    .then(articles => {
      //console.log(articles);
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.postArticleData = (req, res, next) => {
  insertArticleData(req.body)
    .then(([newInsertedArticleData]) => {
      res.status(201).send({ newInsertedArticleData });
    })
    .catch(next);
};

exports.sendArticleByID = (req, res, next) => {
  getArticleByID(req.params)
    .then(([article]) => {
      if (!article)
        return Promise.reject({ status: 404, msg: "Article not found" });
      else return res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleVotes = (req, res, next) => {
  //console.log(req.body);
  updateArticleVotes(req.params, req.body)
    .then(([updatedArticle]) => {
      //console.log(updatedArticle);
      res.status(200).send({
        updatedArticle
      });
    })
    .catch(console.log);
};

exports.deleteArticleByID = (req, res, next) => {
  removeArticleByID(req.params)
    .then(() => {
      res.status(204).send({});
    })
    .catch(console.log);
};

exports.sendArticlesComments = (req, res, next) => {
  getArticlesComments(req.params)
    .then(comments => {
      //console.log(comments);
      res.status(200).send({ comments });
    })
    .catch(console.log);
};

exports.postCommentByarticleID = (req, res, next) => {
  //console.log(req.body);
  insertCommentsByArticleID(req.params, req.body)
    .then(([newInsertedComment]) => {
      //console.log(newInsertedComment);
      res.status(201).send({ newInsertedComment });
    })
    .catch(console.log);
};
