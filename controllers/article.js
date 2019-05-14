const {
  getarticlesData,
  insertArticleData,
  getArticleByID,
  updateArticleVotes,
  removeArticleByID,
  getArticlesComments,
  insertCommentsByArticleID,
} = require('../models/article');

exports.sendArticlesData = (req, res, next) => {
  getarticlesData(req.query)
    .then((articles) => {
      if (!articles || articles.length == 0) return Promise.reject({ status: 404, msg: 'Article Not Found' });

      return res.status(200).send({ articles });
    })
    .catch(next);
};

exports.postArticleData = (req, res, next) => {
  insertArticleData(req.body)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.sendArticleByID = (req, res, next) => {
  getArticleByID(req.params)
    .then(([article]) => {
      // console.log(article);
      if (!article) return Promise.reject({ status: 404, msg: 'Article not found' });
      return res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleVotes = (req, res, next) => {
  // if (typeof newVote)
  // console.log(req.params);
  // console.log(req.body);
  updateArticleVotes(req.params, req.body)
    .then(([article]) => {
      // console.log(updatedArticle);
      res.status(200).send({
        article,
      });
    })
    .catch(next);
};

exports.deleteArticleByID = (req, res, next) => {
  getArticleByID(req.params)
    .then(([article]) => {
      if (!article) return Promise.reject({ status: 404, msg: 'Article not found' });
      return removeArticleByID(req.params);
    })
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};

exports.sendArticlesComments = (req, res, next) => {
  getArticleByID(req.params)
    .then(([article]) => {
      if (!article) return Promise.reject({ status: 404, msg: 'Article not found' });
      return getArticlesComments(req.params);
    })
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByarticleID = (req, res, next) => {
  getArticleByID(req.params)
    .then(([article]) => {
      if (!article) return Promise.reject({ status: 404, msg: 'Article not found' });
      return insertCommentsByArticleID(req.params, req.body);
    })
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
