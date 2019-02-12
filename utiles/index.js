exports.createArticLookup = insertedArticlesData => insertedArticlesData.reduce(
  (articleRefObj, eachArticle) => ({
    ...articleRefObj,
    [eachArticle.title]: eachArticle.article_id,
  }),
  {},
);
