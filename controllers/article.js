const {
  getarticlesData,
  insertArticleData,
  getArticleByID,
  updateArticleVotes,
  removeArticleByID
} = require("../models/article");

exports.sendArticlesData = (req, res, next) => {
  getarticlesData(req.query)
    .then(articles => {
      //console.log(articles);
      res.status(200).send({ articles });
    })
    .catch(console.log);
};

exports.postArticleData = (req, res, next) => {
  insertArticleData(req.body)
    .then(([newInsertedArticleData]) => {
      ///ask this[]
      res.status(201).send({ newInsertedArticleData });
    })
    .catch(console.log);
};

exports.sendArticleByID = (req, res, next) => {
  getArticleByID(req.params)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(console.log);
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
