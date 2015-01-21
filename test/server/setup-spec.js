var bookshelf = require('../../server/config/bookshelf');

before(function (done) {
  return bookshelf.knex.schema.dropTableIfExists('companies').dropTableIfExists('users').then(function() {
    bookshelf.knex.migrate.latest().then(function() {
      return bookshelf.knex.seed.run().then(function() {
        done();
      });
    });
  });
});

after(function(done) {
  return bookshelf.knex.migrate.rollback().then(function() {
    done();
  });
});
