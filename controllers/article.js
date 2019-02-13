const { getarticlesData } = require("../models/article");

exports.sendArticlesData = (req, res, next) => {
  const { author } = req.query;
  getarticlesData(author)
    .then(articles => {
      //console.log(articles);
      res.status(200).send({ articles });
    })
    .catch(console.log);
};
