var gulp  = require('gulp');
var exec  = require('child_process').exec;
var spawn = require("gulp-spawn").spawn;

  gulp.task('mongo', function (cb) {
    exec('start mongod --dbpath ', function (err, stdout, stderr) {
   console.log(stdout);
   console.log(stderr);
   cb(err);
 });
  });
