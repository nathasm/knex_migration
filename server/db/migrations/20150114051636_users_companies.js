
exports.up = function(knex, Promise) {
  return knex.transaction(function(trx) {
    return trx.schema.createTable('users', function(t) {

      t.increments('id').primary();
      t.string('username').unique().notNull();
      t.string('email').unique().notNull();
      t.string('password').notNull();

      t.timestamps();

    }).createTable('companies', function(t) {

      t.increments('id').primary();
      t.string('name').unique().notNull();
      t.string('logo').notNull();
      t.string('website').notNull();
      t.string('contact').notNull();
      t.string('address').notNull();
      t.string('city').notNull();
      t.string('state').notNull();
      t.string('zip').notNull();
      t.string('description').notNull();
      t.string('industry').notNull();
      t.timestamps();

    });
  })
  .catch(function(error) {
    console.error('MIGRATION ERROR:', error);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('companies').dropTable('users');
};
