var config = require('./index');
var knex = require('knex')(config.db);
var bookshelf = require('bookshelf')(knex);

// Allows a model to have hidden attributes that won't be printed
bookshelf.plugin('visibility');
// If models depend on one another this prevents circular dependency
bookshelf.plugin('registry');

module.exports = bookshelf;
