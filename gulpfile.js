const gulp = require('gulp');
const fileInclude = require('gulp-file-include');

gulp.task('html', function () {
  return gulp.src('./src/index.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist'));
});
