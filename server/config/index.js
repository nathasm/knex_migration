var config = require('./' + (process.env.NODE_ENV || 'development') + '.json');
var db = require('./knexfile')[process.env.NODE_ENV];
// If we're in a test environment, reset some of the configuration
db.migrations.directory = __dirname + '/' + db.migrations.directory;
db.seeds.directory = __dirname + '/' + db.seeds.directory;
if(process.env.DB_PORT) {
  db.connection.host = process.env.DB_PORT_3306_TCP_ADDR;
}
config.db = db;
module.exports = config;
