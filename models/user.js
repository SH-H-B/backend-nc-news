const connection = require('../db/connection');

exports.getUsersData = () => connection
  .select('*')
  .from('users')
  .returning('*');

exports.addUserData = newUserData => connection
  .insert(newUserData)
  .into('users')
  .returning('*');

exports.getUserByUsername = ({ username }) => connection
  .select('*')
  .from('users')
  .where('username', '=', username)
  .returning('*');
