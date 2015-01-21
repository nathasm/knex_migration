
exports.up = function(knex, Promise) {
  return knex.transaction(function(trx) {
    return trx.schema.table('companies', function(t) {

      t.integer('user_id').unsigned().references('id').inTable('users');
      t.integer('demographics_id').unsigned().references('id').inTable('demographics');
      t.integer('ages_id').unsigned().references('id').inTable('ages');
      t.integer('email_list_sizes_id').unsigned().references('id').inTable('email_list_sizes');
    });
  });
};

exports.down = function(knex, Promise) {

};
