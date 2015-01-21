
exports.up = function(knex, Promise) {
  return knex.transaction(function(trx) {
    return trx.schema.createTable('ages', function(t) {
      t.increments('id').primary();
      t.string('name').unique().notNull();
    }).createTable('demographics', function(t) {
      t.increments('id').primary();
      t.string('name').unique().notNull();
    }).createTable('email_list_sizes', function(t) {
      t.increments('id').primary();
      t.string('name').unique().notNull();
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('ages')
  .dropTable('demographics')
  .dropTable('email_list_sizes');
};
