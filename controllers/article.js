const { getarticlesData, insertArticleData } = require("../models/article");

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
    .then(newInsertedArticleData => {
      res.status(201).send({ newInsertedArticleData });
    })
    .catch(console.log);
};
