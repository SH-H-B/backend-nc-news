const {
  getarticlesData,
  insertArticleData,
  getArticleByID
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
