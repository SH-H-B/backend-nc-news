exports.createArticLookup = insertedArticlesData => {
  //console.log(insertedArticlesData[0]);
  return insertedArticlesData.reduce((articleRefObj, eachArticle) => {
    return {
      ...articleRefObj,
      [eachArticle.title]: eachArticle.article_id
    };
  }, {});
};
