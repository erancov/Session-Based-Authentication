var gulp             = require('gulp');
var exec             = require('child_process').exec;
var spawn          = require("gulp-spawn").spawn;
var gutil              = require('gulp-util');
var colors           = require('colors');
var config           = require('./config/environments');

  gulp.task('mongo', function (cb) {
  gutil.log("@@@".green+"Running on port :" + config.db.port + "@@@" .green);
    exec(config.db.path, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  });

  gulp.task('server', function (cb) {
  gutil.log("@@@".magenta + "Running on port :" + config.server.port + "@@@".magenta);
    exec('node server.js', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  });

  gulp.task('app', ['mongo', 'server']);
