var gulp = require('gulp');
var fs = require('fs');
var tasks = require('gulp-load-plugins')();
var mocha = require('gulp-spawn-mocha');

gulp.task('mocha', function() {
  return gulp.src(['test/server/**/*.js'])
  .pipe(mocha({
    reporter: 'mocha-jenkins-reporter',
    env: {
      'NODE_ENV': 'test'
    }
  }))
  .on('error', tasks.util.log);
});

gulp.task('refreshdb', tasks.shell.task([
  'knex --knexfile server/config/knexfile.js migrate:rollback',
  'knex --knexfile server/config/knexfile.js migrate:latest',
  'knex --knexfile server/config/knexfile.js seed:run'
]));
