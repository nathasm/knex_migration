module.exports = {

  test: {
    debug: true,
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'user',
      password: 'password',
      database: 'test',
      charset: 'utf8'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'server/db/migrations'
    }
  },

};
