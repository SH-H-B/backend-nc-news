const connection = require('../db/connection');

exports.getTopicsData = () => connection
  .select('*')
  .from('topics')
  .returning('*');

exports.addTopic = newTopicData => connection
  .insert(newTopicData)
  .into('topics')
  .returning('*');
