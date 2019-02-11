--`knex` doesn't have the capability of creating / dropping the whole database so we have to do this in `sql`.
--{ "scripts": { "setup:dbs": "psql -f db/setup.sql"  }}

DROP DATABASE IF EXISTS northcoders_news;
CREATE DATABASE northcoders_news;

DROP DATABASE IF EXISTS northcoders_news_test;
CREATE DATABASE northcoders_news_test;