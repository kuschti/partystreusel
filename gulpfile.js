var gulp        = require('gulp'),
    del         = require('del'),
    notify      = require('gulp-notify'),
    sass        = require('gulp-sass'),
    bourbon     = require('node-bourbon').includePaths,
    neat        = require('node-neat').includePaths,
    imagemin    = require('gulp-imagemin'),
    svgSymbols  = require('gulp-svg-symbols');

var paths = {
  coffee:   './source/javascripts/**/*.coffee',
  sass:     './source/stylesheets/**/*.sass',
  images:   './source/images/*',
  icons:    './source/icons/svg/*.svg'
}

// STYLES
// ----------------------------------------
gulp.task('css', function () {
  gulp.src(paths.sass)
    .pipe(sass({
      includePaths: neat
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

// IMAGES
// ----------------------------------------
gulp.task('imagemin', function () {
  gulp.src(paths.images)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('svgsprite', function () {
  gulp.src(paths.icons)
    .pipe(svgSymbols({
      id:     'icon--%f',
      title:  'icon %f',
      templates: ['source/icons/templates/icon-sprite.svg']
    }))
    .pipe(gulp.dest('dist/images'));
});

// -------
gulp.task('watch', function () {
  // watch .sass files
  gulp.watch(paths.sass, ['css']);
});

// Clean all dist files
// ----------------------------------------
gulp.task('clean', function () {
  return del([
    'dist/css/**/*',
    'dist/js/**/*'
  ]);
});

// Default & build tasks
// ----------------------------------------
gulp.task('default', ['clean', 'build'], function() {
  gulp.start('watch');
});

gulp.task('build', ['clean'], function() {
  gulp.start('css');
});
