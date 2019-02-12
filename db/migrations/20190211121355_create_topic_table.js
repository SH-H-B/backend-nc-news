// to run this file --> package.json---> npm run migrate:latest
// /* Create table with knex.... It is essential that the up function returns a promise so the return statement in this function is important! */

exports.up = function (knex, Promise) {
  return knex.schema.createTable('topics', (topicTable) => {
    topicTable
      .string('slug')
      .primary()
      .unique()
      .notNullable();
    topicTable.text('description');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('topics');
};
