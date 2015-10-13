var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bourbon = require('node-bourbon').includePaths,
    neat = require('node-neat').includePaths;

var paths = {
  coffee: './source/javascripts/**/*.coffee',
  sass: './source/stylesheets/**/*.sass',
  images: './source/images/*'
}

gulp.task('css', function () {
  gulp.src(paths.sass)
    .pipe(sass({
      includePaths: neat
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function () {
  // watch .sass files
  gulp.watch(paths.sass, ['css']);
});

//---------------------------------------
gulp.task('default', function () {
  gulp.start('watch');
});
