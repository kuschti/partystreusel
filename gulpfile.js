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
      template: 'source/icons/templates/_icons_stylesheet.hbs',
      previewTemplate: 'source/icons/templates/_icons_preview.hbs'
    };

gulp.task("gulpicon", gulpicon(gulpiconFiles, gulpiconOptions));

gulp.task("gulpiconCleanup", function () {
  del('dist/images/*.js');
  // gulp.src('dist/images/*.css')
  //   .pipe(gulp.dest('dist/css/icons'));
});

// Icon workflow
gulp.task('icons', ['cleanIcons', 'imagemin', 'svgsprite', 'gulpicon', 'gulpiconCleanup']);

// Watch for file changes
// ----------------------------------------
gulp.task('watch', function () {
  gulp.watch(paths.sass, ['css']);
  gulp.watch(paths.icons, ['icons']);
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

gulp.task('cleanIcons', function () {
  del([
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
