var gulp             = require('gulp');
var exec             = require('child_process').exec;
var spawn          = require("gulp-spawn").spawn;
var gutil              = require('gulp-util');
var colors           = require('colors');
var mongoPath = "\"C:\\Program Files\\MongoDB\\Server\\3.0\\bin\\mongod.exe\"";

  gulp.task('mongo', function (cb) {
  gutil.log("@@@Running on port :27017@@@" .green);
    exec(mongoPath, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  });

  gulp.task('server', function (cb) {
  gutil.log("@@@Running on port :1337@@@".magenta);
    exec('node server.js', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  });

  gulp.task('app', ['mongo', 'server']);
