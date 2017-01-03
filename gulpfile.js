'use strict';

// modules
var gulp          = require('gulp');
var gutil         = require('gulp-util');
var gulpif        = require('gulp-if');
var del           = require('del');
var csso          = require('gulp-csso');
var rename        = require('gulp-rename');
var assemble      = require('fabricator-assemble');
var webpack       = require('webpack');
var runSequence   = require('run-sequence');
var browserSync   = require('browser-sync');
var coffee        = require("gulp-coffee");
var include       = require('gulp-include');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var addsrc        = require('gulp-add-src');
var imagemin      = require('gulp-imagemin');
var svgSymbols    = require('gulp-svg-symbols');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var notify        = require('gulp-notify');
var ghPages       = require('gulp-gh-pages');
var postcss     	= require('gulp-postcss');
var postcss_syntax_scss = require('postcss-scss');
var reporter    	= require('postcss-reporter');
var stylelint   	= require('stylelint');
var doiuse        = require('doiuse');
var metadata      = require('./package.json');

// configuration
// ----------------------------------------
var config = {
  dev: gutil.env.dev === true ? true : false,
  src: {
    scripts: {
      fabricator: [
        './src/_partystreusel/fabricator/scripts/fabricator.js',
        './src/_partystreusel/fabricator/scripts/partystreusel.js'
      ],
      application: './src/application.coffee',
      vendor:      './src/vendor/*.js',
      polyfills:   'src/vendor/polyfills/*'
    },
    styles: {
      fabricator: 'src/_partystreusel/fabricator/styles/fabricator.scss',
      fabricatorpartials: 'src/_partystreusel/**/*.scss',
      application: 'src/application.scss',
      applicationpartials: 'src/materials/**/*.scss'
    },
    fonts:  'src/materials/atoms/fonts/*.{eot,woff,woff2,ttf,svg}',
    imagesfolder: 'src/images/',
    images: [
      'src/images/**/*',
      '!src/images/icons/*'
    ],
    icons:  'src/images/icons/',
    iconsystem:  'src/materials/atoms/icons'
  },
  dest: 'dist',
  browsers: ['last 2 versions', 'ie >= 10', '> 1% in CH']
};

// webpack
// ----------------------------------------
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);

// clean
// ----------------------------------------
gulp.task('clean', function () {
  return del([config.dest]);
});

// STYLES
// ----------------------------------------

gulp.task('styles:fabricator', function () {
  return gulp.src(config.src.styles.fabricator)
    .pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixer(config.browsers))
    .pipe(gulpif(!config.dev, csso()))
    .pipe(rename('p.css'))
    .pipe(gulp.dest(config.dest + '/assets/partystreusel/styles'))
    .pipe(gulpif(config.dev, browserSync.stream({match: '**/*.css'})));
});

gulp.task('styles:application', function () {
  return gulp.src(config.src.styles.application)
    .pipe(gulpif(config.dev, sourcemaps.init()))
    .pipe(sass({
      includePaths: ['node_modules']
    }).on('error', notify.onError()))
    .pipe(autoprefixer(config.browsers))
    .pipe(gulpif(!config.dev, csso()))
    .pipe(gulpif(config.dev, sourcemaps.write('./')))
    .pipe(gulp.dest(config.dest + '/assets/styles'))
    .pipe(gulpif(config.dev, browserSync.stream({match: '**/*.css'})));
});

//lint styles
gulp.task("styles:lint", function() {
  var processors = [
    stylelint(),
    // Pretty reporting config
    reporter({
      clearAllMessages: true,
      throwError: false
    })
  ];

  return gulp.src(
      ['src/**/*.scss',
      // Ignore linting vendor assets:
      '!src/_partystreusel/**/*.scss',
      '!src/vendor/*']
    )
    .pipe(postcss(processors, {syntax: postcss_syntax_scss}));
});

gulp.task('styles', ['styles:lint', 'styles:fabricator', 'styles:application']);

//check styles wit caniuse/doiuse
gulp.task("styles:doiuse", function() {
  var processors = [
    doiuse({
      browsers: config.browsers,
      ignore: ['rem', 'flexbox']
    }),
    // Pretty reporting config
    reporter({
      clearAllMessages: true,
      throwError: false
    })
  ];

  return gulp.src(
      ['src/**/*.scss',
      '!src/_partystreusel/**/*.scss',
      '!src/vendor/*']
    )
    .pipe(postcss(processors, {syntax: postcss_syntax_scss}));
});


// SCRIPTS
// ----------------------------------------
gulp.task('scripts', function (done) {
  webpackCompiler.run(function (error, result) {
    if (error) {
      gutil.log(gutil.colors.red(error));
      notify.onError()
    }
    result = result.toJson();
    if (result.errors.length) {
      result.errors.forEach(function (error) {
        gutil.log(gutil.colors.red(error));
      });
    }
    done();
  });
});

gulp.task('coffee', function() {
  gulp.src(config.src.scripts.application)
    .pipe(include())
    .pipe(coffee())
    .pipe(addsrc.prepend(config.src.scripts.vendor))
    .pipe(concat("application.js"))
    .pipe(gulpif(!config.dev, uglify()))
    .pipe(gulp.dest(config.dest + '/assets/scripts'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('polyfills', function() {
  gulp.src(config.src.scripts.polyfills)
    .pipe(gulp.dest(config.dest + '/assets/scripts/polyfills'))
});


// IMAGES
// ----------------------------------------
gulp.task('images', function () {
  return gulp.src(config.src.images)
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest(config.src.imagesfolder))
    .pipe(gulp.dest(config.dest + '/assets/images'));
});

// ICONS
// ----------------------------------------

gulp.task('svgmin', function () {
  return gulp.src(config.src.icons + '*.svg')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeDesc: true },
          { removeTitle: true }
        ]
      })
    ]))
    .pipe(gulp.dest(config.src.icons));
});

gulp.task('svgsprite', ['svgmin'], function () {
  gulp.src(config.src.icons + '*.svg')
    .pipe(svgSymbols({
      id:     'icon--%f',
      title:  'icon %f',
      svgClassname: 'icon__sprite',
      templates: [
        config.src.iconsystem + '/_icon-sprite-template.svg',
        config.src.iconsystem + '/_icons-preview-template.html'
      ]
    }))
    .pipe(gulpif( /[.]svg$/, rename('icon-sprite.svg')))
    .pipe(gulpif( /[.]svg$/, gulp.dest(config.dest + '/assets/images/icons')))
    .pipe(gulpif( /[.]html$/, rename('all-icons.html')))
    .pipe(gulpif( /[.]html$/, gulp.dest(config.src.iconsystem)));
});

// Icon workflow
gulp.task('icons', ['svgmin', 'svgsprite']);


// Fonts
// ----------------------------------------
gulp.task('fonts', function() {
  return gulp.src(config.src.fonts)
   .pipe(gulp.dest(config.dest + '/assets/fonts'));
});

// assemble
// ----------------------------------------
gulp.task('assemble', function (done) {
  assemble({
    logErrors: config.dev,
    layout: 'partystreusel',
    layouts: 'src/materials/templates/*.html',
    layoutIncludes: 'src/_partystreusel/fabricator/layouts/includes/*',
    views: ['src/_partystreusel/fabricator/views/**/*', 'src/pages/**/*'],
    materials: 'src/materials/**/!(_)*.html',
    data: 'src/materials/**/*.{json,yml}',
    docs: ['docs/**/*.md', 'src/materials/**/*.md'],
    helpers: {
      currentVersion: function() {
        return metadata.version;
      },
      increment: function(value) {
        return parseInt(value) + 1;
      }
    }
  });
  done();
});

// DEPLOY
// ----------------------------------------
gulp.task('deploy:github', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('deploy', function() {
  runSequence(
    'clean',
    [
      'styles',
      'scripts',
      'coffee',
      'polyfills',
      'fonts',
      'images',
      'icons',
      'assemble'
    ],
    'deploy:github'
  );
});

// // Install & require 'gulp-sftp' for this task
// gulp.task('deploy:remote', function () {
//   return gulp.src('dist/**/*')
//     .pipe(sftp({
//       host: 'php1.brandleadership.ch',
//       user: 'www-data',
//       remotePath: '/home/www-data/REPLACEME/'
//     }));
// });


// SERVER
// ----------------------------------------
gulp.task('serve', function () {

  browserSync({
    server: {
      baseDir: config.dest
    },
    notify: false,
    logPrefix: 'FABRICATOR'
  });

  /**
   * Because webpackCompiler.watch() isn't being used
   * manually remove the changed file path from the cache
   */
  function webpackCache(e) {
    var keys = Object.keys(webpackConfig.cache);
    var key, matchedKey;
    for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      key = keys[keyIndex];
      if (key.indexOf(e.path) !== -1) {
        matchedKey = key;
        break;
      }
    }
    if (matchedKey) {
      delete webpackConfig.cache[matchedKey];
    }
  }

  gulp.task('assemble:watch', ['assemble'], browserSync.reload);
  gulp.watch(['docs/*.md','src/**/*.{html,md,json,yml}'], ['assemble:watch']);

  gulp.task('styles:fabricator:watch', ['styles:fabricator']);
  gulp.watch(config.src.styles.fabricatorpartials, ['styles:fabricator:watch']);

  gulp.task('styles:application:watch', ['styles:application']);
  gulp.watch(config.src.styles.applicationpartials, ['styles:application:watch']);

  gulp.task('scripts:watch', ['scripts'], browserSync.reload);
  gulp.watch('src/_partystreusel/fabricator/scripts/**/*.js', ['scripts:watch']).on('change', webpackCache);

  gulp.task('coffee:watch', ['coffee'], browserSync.reload);
  gulp.watch('src/materials/**/*.coffee', ['coffee:watch']);

  gulp.task('images:watch', ['images'], browserSync.reload);
  gulp.watch(config.src.images, ['images:watch']);

});

gulp.task('build', ['default']);

// DEFAULT BUILD TASK
// ----------------------------------------
gulp.task('default', ['clean'], function () {
  // define build tasks
  var tasks = [
    'styles',
    'scripts',
    'coffee',
    'polyfills',
    'fonts',
    'images',
    'icons',
    'assemble'
  ];

  // run build
  runSequence(tasks, function () {
    if (config.dev) {
      gulp.start('serve');
    }
  });

});
