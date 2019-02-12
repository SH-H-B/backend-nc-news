const ENV = process.env.NODE_ENV || 'development';

const dbConfig = require('../knexfile');

const connection = require('knex')(dbConfig);

module.exports = connection;
