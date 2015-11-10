'use strict';

// Modules
var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    del           = require('del'),
    include       = require('gulp-include'),
    concat        = require('gulp-concat'),
    flatten        = require('gulp-flatten'),
    addsrc        = require('gulp-add-src'),
    plumber       = require('gulp-plumber'),
    notify        = require('gulp-notify'),
    sass          = require('gulp-sass'),
    coffee        = require("gulp-coffee"),
    jade          = require('gulp-jade'),
    bourbon       = require('node-bourbon').includePaths,
    neat          = require('node-neat').includePaths,
    sourcemaps    = require('gulp-sourcemaps'),
    imagemin      = require('gulp-imagemin'),
    svgSymbols    = require('gulp-svg-symbols'),
    glob          = require('glob'),
    gulpicon      = require('gulpicon/tasks/gulpicon'),
    browserSync   = require('browser-sync'),
    autoprefixer  = require('gulp-autoprefixer');;

var paths = {
  images:       'source/images/*',
  icons:        'source/ui/icons/svg/*.svg',
  coffee:       'source/**.coffee',
  vendor:       'source/vendor/*.js',
  polyfills:    'source/vendor/polyfills/*',
  sass:         'source/**/*.scss',
  jade:         ['source/index.jade',
                'source/core/**/*.jade',
                'source/ui/**/*.jade',
                'source/modules/**/*.jade'],
  jadePartials: 'source/partials/*.jade'
}

// Browser defintion for autoprefixer
var autoprefixerOptions = ['last 2 version', 'ie 9', '> 1%'];

// STYLES
// ----------------------------------------
gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: neat
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: autoprefixerOptions
      }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({stream: true}))
});

// JADE
// ----------------------------------------
gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .on('error', notify.onError())
    .on('error', function(err) {
      console.log("Error:", err);
    })
    .pipe(flatten())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({stream: true}))
});

// JS
// ----------------------------------------
gulp.task('js:coffee', function() {
  gulp.src(paths.coffee)
    .pipe(include())
    .pipe(coffee())
    .pipe(addsrc.prepend(paths.vendor))
    .pipe(concat("application.js"))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js:polyfills', function() {
  gulp.src(paths.polyfills)
    .pipe(gulp.dest('./dist/js/polyfills'))
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

gulp.task('svgmin', function () {
  gulp.src(paths.icons)
    .pipe(imagemin({
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('svgsprite', function () {
  gulp.src(paths.icons)
    .pipe(svgSymbols({
      id:     'icon--%f',
      title:  'icon %f',
      templates: ['source/ui/icons/templates/icon-sprite.svg']
    }))
    .pipe(gulp.dest('dist/images/icons'));
});

var gulpiconFiles = glob.sync(paths.icons),
    gulpiconOptions = {
      dest: 'dist/images/icons',
      cssprefix: '.icon--',
      pngpath: "images/icons/png",
      pngfolder: 'png',
      previewhtml: "../../../source/ui/icons/icons.jade",
      template: 'source/ui/icons/templates/_icons_stylesheet.hbs',
      previewTemplate: 'source/ui/icons/templates/_icons_preview.hbs'
    };

gulp.task("gulpicon", gulpicon(gulpiconFiles, gulpiconOptions));

gulp.task("gulpicon:cleanup", function () {
  del('dist/images/icons/*.js');
});

// Icon workflow
gulp.task('icons', ['clean:icons', 'imagemin', 'svgsprite', 'gulpicon', 'gulpicon:cleanup']);

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
          baseDir: "./dist/"
        },
        notify: false
    });
});

// Watch for file changes
// ----------------------------------------
gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.icons, ['icons']);
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch([paths.jade, paths.jadePartials], ['jade']);
});

// Clean all dist files
// ----------------------------------------
gulp.task('clean', function () {
  return del([
    'dist/css/**/*',
    'dist/js/**/*',
    'dist/images/**/*',
    'dist/**/*.html'
  ]);
});

gulp.task('clean:css', function () {
  del('dist/css/**/*');
});

gulp.task('clean:js', function () {
  del('dist/js/**/*');
});

gulp.task('clean:icons', function () {
  del([
    'dist/images/icons/*',
    'dist/css/icons/*',
  ]);
});

// Default & build tasks
// ----------------------------------------
gulp.task('default', ['clean', 'build'], function() {
  gulp.start('browser-sync', 'watch');
});

gulp.task('serve', ['browser-sync', 'watch']);

gulp.task('build', ['clean'], function() {
  gulp.start('icons', 'imagemin', 'sass', 'js:coffee', 'js:polyfills', 'jade');
});
