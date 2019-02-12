const {
  topicData, userData, articleData, commentData,
} = require('../data');
const { createArticLookup } = require('../utiles/index');

exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('topics').insert(topicData))
    .then(() => knex('users').insert(userData))
    .then(() => {
      const formatedArticlesData = articleData.map(eachArticle => ({
        title: eachArticle.title,
        body: eachArticle.body,
        topic: eachArticle.topic,
        author: eachArticle.author,
        created_at: new Date(eachArticle.created_at),
      }));
      // console.log(formatedArticlesData);
      return knex
        .insert(formatedArticlesData)
        .into('articles')
        .returning('*');
    })
    .then((insertedArticlesData) => {
      // console.log(insertedArticlesData[0]);
      const lookUpObject = createArticLookup(insertedArticlesData);
      const commentsWithArticlesID = commentData.map(eachComment => ({
        body: eachComment.body,
        author: eachComment.created_by,
        votes: eachComment.votes,
        created_at: new Date(eachComment.created_at),
        article_id: lookUpObject[eachComment.belongs_to],
      }));
      return knex.insert(commentsWithArticlesID).into('comments');
    });
};
