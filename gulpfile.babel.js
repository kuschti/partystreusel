/* eslint-disable import/no-extraneous-dependencies */

// modules
import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import del from 'del';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import assemble from 'fabricator-assemble';
import webpack from 'webpack';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import svgSymbols from 'gulp-svg-symbols';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import bourbon from 'node-bourbon';
import neat from 'bourbon-neat';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import ghPages from 'gulp-gh-pages';
import postcss from 'gulp-postcss';
import postcssSyntaxScss from 'postcss-scss';
import reporter from 'postcss-reporter';
import stylelint from 'stylelint';
import doiuse from 'doiuse';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import webpackStream from 'webpack-stream';
import metadata from './package.json';
import webpackConfigBabel from './webpack.config.babel';

// configuration
// ----------------------------------------
const config = {
  dev: gutil.env.dev === true,
  src: {
    scripts: {
      fabricator: [
        './src/_styleguide/fabricator/scripts/fabricator.js',
        './src/_styleguide/fabricator/scripts/partystreusel.js',
      ],
      application: 'src/application.js',
      base: 'src/base.js',
      settings: 'src/settings.js',
      vendor: 'src/vendor/*.js',
      polyfills: 'src/vendor/polyfills/*',
    },
    styles: {
      fabricator: 'src/_styleguide/fabricator/styles/fabricator.scss',
      fabricatorpartials: 'src/_styleguide/**/*.scss',
      application: 'src/application.scss',
      applicationpartials: 'src/materials/**/*.scss',
    },
    fonts: 'src/materials/atoms/fonts/*.{eot,woff,woff2,ttf,svg}',
    imagesfolder: 'src/images/',
    images: [
      'src/images/**/*',
      '!src/images/icons/*',
    ],
    icons: 'src/images/icons/',
    iconsystem: 'src/materials/atoms/icons',
  },
  dest: 'dist',
  browsers: ['last 2 versions', 'ie >= 10', '> 1% in CH'],
  webpack: {
    allSrcJs: 'src/materials/**/*.js?(x)',
    clientEntryPoint: 'src/application.js',
    clientBundle: 'dist/scripts/application.js?(.map)',
    gulpFile: 'gulpfile.babel.js',
    webpackFile: 'webpack.config.babel.js',
    libDir: 'lib',
    distDir: 'dist/assets/scripts/',
  },
};

// webpack
// ----------------------------------------
const webpackConfig = require('./webpack.config')(config);

const webpackCompiler = webpack(webpackConfig);

// clean
// ----------------------------------------
gulp.task('clean', () => del([
  config.dest,
]));

// STYLES
// ----------------------------------------

gulp.task('styles:fabricator', () => {
  gulp.src(config.src.styles.fabricator)
    .pipe(sass({
      includePaths: [neat.includePaths, bourbon.includePaths],
    }).on('error', notify.onError()))
    .pipe(autoprefixer(config.browsers))
    .pipe(gulpif(!config.dev, csso()))
    .pipe(rename('p.css'))
    .pipe(gulp.dest(`${config.dest}/assets/partystreusel/styles`))
    .pipe(gulpif(config.dev, browserSync.stream({ match: '**/*.css' })));
});

gulp.task('styles:application', () => {
  gulp.src(config.src.styles.application)
    .pipe(gulpif(config.dev, sourcemaps.init()))
    .pipe(sass({
      includePaths: [neat.includePaths, bourbon.includePaths, 'node_modules'],
    }).on('error', notify.onError()))
    .pipe(autoprefixer(config.browsers))
    .pipe(gulpif(!config.dev, csso()))
    .pipe(gulpif(config.dev, sourcemaps.write('./')))
    .pipe(gulp.dest(`${config.dest}/assets/styles`))
    .pipe(gulpif(config.dev, browserSync.stream({ match: '**/*.css' })));
});

// Lint styles
gulp.task('styles:lint', () => {
  const processors = [
    stylelint(),
    // Pretty reporting config
    reporter({
      clearMessages: true,
      throwError: false,
    }),
  ];

  return gulp.src([
    'src/**/*.scss',
    // Ignore linting vendor assets:
    '!src/_styleguide/**/*.scss',
    '!src/vendor/*',
  ])
  .pipe(postcss(processors, { syntax: postcssSyntaxScss }));
});

gulp.task('styles', ['styles:lint', 'styles:fabricator', 'styles:application']);

// Check styles wit caniuse/doiuse
gulp.task('styles:doiuse', () => {
  const processors = [
    doiuse({
      browsers: config.browsers,
      ignore: ['rem', 'flexbox'],
    }),
    // Pretty reporting config
    reporter({
      clearMessages: true,
      throwError: false,
    }),
  ];

  return gulp.src([
    'src/**/*.scss',
    '!src/_styleguide/**/*.scss',
    '!src/vendor/*',
  ])
  .pipe(postcss(processors, { syntax: postcssSyntaxScss }));
});


// SCRIPTS
// ----------------------------------------
gulp.task('scripts:fabricator', (done) => {
  webpackCompiler.run((error, result) => {
    if (error) {
      gutil.log(gutil.colors.red(error));
      notify.onError();
    }
    const resultJson = result.toJson();
    if (resultJson.errors.length) {
      resultJson.errors.forEach(() => {
        gutil.log(gutil.colors.red(error));
      });
    }
    done();
  });
});

gulp.task('scripts:application:lint', () =>
  gulp.src([
    config.webpack.allSrcJs,
    config.webpack.gulpFile,
    config.webpack.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('scripts:application:clean', () => del([
  config.webpack.libDir,
  config.webpack.clientBundle,
]));

// Check why this is used
gulp.task('build', ['scripts:application:lint', 'scripts:application:clean'], () =>
  gulp.src(config.webpack.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(config.webpack.libDir))
);

gulp.task('scripts:application', ['scripts:application:lint', 'scripts:application:clean'], () =>
  gulp.src(config.webpack.clientEntryPoint)
    .pipe(webpackStream(webpackConfigBabel))
    .pipe(gulp.dest(config.webpack.distDir))
);

gulp.task('polyfills', () => {
  gulp.src(config.src.scripts.polyfills)
    .pipe(gulp.dest(`${config.dest}/assets/scripts/polyfills`));
});


// IMAGES
// ----------------------------------------
gulp.task('images', () => {
  gulp.src(config.src.images)
    .pipe(imagemin([
      imagemin.jpegtran({ progressive: true }),
    ]))
    .pipe(gulp.dest(config.src.imagesfolder))
    .pipe(gulp.dest(`${config.dest}/assets/images`));
});

// ICONS
// ----------------------------------------

gulp.task('svgmin', () => {
  gulp.src(`${config.src.icons}*.svg`)
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeDesc: true },
          { removeTitle: true },
        ],
      }),
    ]))
    .pipe(gulp.dest(config.src.icons));
});

gulp.task('svgsprite', ['svgmin'], () => {
  gulp.src(`${config.src.icons}*.svg`)
    .pipe(svgSymbols({
      id: 'icon--%f',
      title: 'icon %f',
      svgClassname: 'icon__sprite',
      templates: [
        `${config.src.iconsystem}/_icon-sprite-template.svg`,
        `${config.src.iconsystem}/_icons-preview-template.html`,
      ],
    }))
    .pipe(gulpif(/[.]svg$/, rename('icon-sprite.svg')))
    .pipe(gulpif(/[.]svg$/, gulp.dest(`${config.dest}/assets/images/icons`)))
    .pipe(gulpif(/[.]html$/, rename('all-icons.html')))
    .pipe(gulpif(/[.]html$/, gulp.dest(config.src.iconsystem)));
});

// Icon workflow
gulp.task('icons', ['svgmin', 'svgsprite']);


// Fonts
// ----------------------------------------
gulp.task('fonts', () => {
  gulp.src(config.src.fonts)
   .pipe(gulp.dest(`${config.dest}/assets/fonts`));
});

// assemble
// ----------------------------------------
gulp.task('assemble', (done) => {
  assemble({
    logErrors: config.dev,
    layout: 'partystreusel',
    layouts: 'src/materials/templates/*.html',
    layoutIncludes: 'src/_styleguide/fabricator/layouts/includes/*',
    views: ['src/_styleguide/fabricator/views/**/*', 'src/pages/**/*'],
    materials: 'src/materials/**/!(_)*.html',
    data: 'src/materials/**/*.{json,yml}',
    docs: ['docs/**/*.md', 'src/materials/**/*.md'],
    helpers: {
      currentVersion() {
        return metadata.version;
      },
      increment(value) {
        return parseInt(value, 10) + 1;
      },
    },
  });
  done();
});

// DEPLOY
// ----------------------------------------
gulp.task('deploy:github', () => {
  gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('deploy', () => {
  runSequence(
    'clean',
    [
      'styles',
      'scripts:fabricator',
      'scripts:application',
      'polyfills',
      'fonts',
      'images',
      'icons',
      'assemble',
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
gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: config.dest,
    },
    notify: false,
    logPrefix: 'FABRICATOR',
  });

  /**
   * Because webpackCompiler.watch() isn't being used
   * manually remove the changed file path from the cache
   */
  function webpackCache(e) {
    const keys = Object.keys(webpackConfig.cache);
    let keyIndex;
    let key;
    let matchedKey;

    for (keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
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
  gulp.watch(['docs/*.md', 'src/**/*.{html,md,json,yml}'], ['assemble:watch']);

  gulp.task('styles:fabricator:watch', ['styles:fabricator']);
  gulp.watch(config.src.styles.fabricatorpartials, ['styles:fabricator:watch']);

  gulp.task('styles:application:watch', ['styles:application']);
  gulp.watch(config.src.styles.applicationpartials, ['styles:application:watch']);

  gulp.task('scripts:fabricator:watch', ['scripts:fabricator'], browserSync.reload);
  gulp.watch('src/_styleguide/fabricator/scripts/**/*.js', ['fabricator:watch']).on('change', webpackCache);

  gulp.task('scripts:application:watch', ['scripts:application'], browserSync.reload);
  gulp.watch(config.webpack.allSrcJs, ['scripts:application:watch']);

  gulp.task('images:watch', ['images'], browserSync.reload);
  gulp.watch(config.src.images, ['images:watch']);
});

gulp.task('build', ['default']);

// DEFAULT BUILD TASK
// ----------------------------------------
gulp.task('default', ['clean'], () => {
  // define build tasks
  const tasks = [
    'styles',
    'scripts:fabricator',
    'scripts:application',
    'polyfills',
    'fonts',
    'images',
    'icons',
    'assemble',
  ];

  // run build
  runSequence(tasks, () => {
    if (config.dev) {
      gulp.start('serve');
    }
  });
});
