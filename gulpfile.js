var gulp        = require('gulp'),
    del         = require('del'),
    notify      = require('gulp-notify'),
    sass        = require('gulp-sass'),
    bourbon     = require('node-bourbon').includePaths,
    neat        = require('node-neat').includePaths,
    imagemin    = require('gulp-imagemin'),
    svgSymbols  = require('gulp-svg-symbols'),
    glob        = require("glob"),
    gulpicon    = require("gulpicon/tasks/gulpicon");

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
    .pipe(gulp.dest('dist/images/icons'));
});

var gulpiconFiles = glob.sync(paths.icons)
    gulpiconOptions = {
      dest: 'dist/images',
      cssprefix: '.icon--',
      pngpath: "images/icons/png",
      pngfolder: 'icons/png',
      previewhtml: "../../source/styleguide/icons.html.haml",
      template: 'source/icons/templates/_icons_stylesheet_template.hbs',
      previewTemplate: 'source/icons/templates/_icons_preview_template.hbs'
    };

gulp.task("gulpicon", gulpicon(gulpiconFiles, gulpiconOptions));

// Icon workflow
gulp.task('icons', ['cleanIconsDist', 'imagemin', 'svgsprite', 'gulpicon']);

// Watch for file changes
// ----------------------------------------
gulp.task('watch', function () {
  // watch .sass files
  gulp.watch(paths.sass, ['css']);
});

// Clean all dist files
// ----------------------------------------
gulp.task('clean', function () {
  return del([
    'dist/css/**/*',
    'dist/js/**/*',
    'dist/images/**/*'
  ]);
});

gulp.task('cleanIconsDist', function () {
  return del([
    'dist/images/icons/*',
    'dist/css/icons/*'
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
