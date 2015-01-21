var gulp = require('gulp');
var mocha = require('gulp-spawn-mocha');
var shell = require('gulp-shell');

gulp.task('mocha', function() {
  return gulp.src(['test/server/**/*.js'])
  .pipe(mocha({
    env: {
      'NODE_ENV': 'test'
    }
  }));
});

gulp.task('refreshdb', shell.task([
  'knex --knexfile server/config/knexfile.js migrate:rollback',
  'knex --knexfile server/config/knexfile.js migrate:latest',
  'knex --knexfile server/config/knexfile.js seed:run'
]));
