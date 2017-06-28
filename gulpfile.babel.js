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
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import ghPages from 'gulp-gh-pages';
import postcss from 'gulp-postcss';
import postcssSyntaxScss from 'postcss-scss';
import reporter from 'postcss-reporter';
import stylelint from 'stylelint';
import doiuse from 'doiuse';
import eslint from 'gulp-eslint';
import webpackStream from 'webpack-stream';
import named from 'vinyl-named';
import metadata from './package.json';

// CONFIG
// ----------------------------------------
const partystreuselRoot = 'src';
const config = {
  dev: gutil.env.dev === true,
  src: {
    docs: 'docs',
    fabricator: `./${partystreuselRoot}/_partystreusel/fabricator`,
    scripts: {
      fabricator: [
        `./${partystreuselRoot}/_partystreusel/fabricator/scripts/fabricator.js`,
        `./${partystreuselRoot}/_partystreusel/fabricator/scripts/partystreusel.js`,
      ],
      application: `${partystreuselRoot}/*.js`,
      config: `${partystreuselRoot}/_config/{base,streusel}.js`,
      polyfills: `${partystreuselRoot}/polyfills.js`,
      vendorFiles: `${partystreuselRoot}/vendor/*.js`,
      materials: `${partystreuselRoot}/materials/**/*.js`,
      applicationEntryPoint: `${partystreuselRoot}/application.js`,
      applicationBundle: 'scripts/application.js?(.map)',
      eslintRc: '.eslintrc.js',
      gulpFile: 'gulpfile.babel.js',
      webpackFile: 'webpack.config.babel.js',
    },
    styles: {
      config: `${partystreuselRoot}/_config/*.scss`,
      fabricator: `${partystreuselRoot}/_partystreusel/fabricator/styles/fabricator.scss`,
      fabricatorpartials: `${partystreuselRoot}/_partystreusel/**/*.scss`,
      application: `${partystreuselRoot}/application.scss`,
      applicationpartials: `${partystreuselRoot}/materials/**/*.scss`,
    },
    fonts: `${partystreuselRoot}/materials/atoms/fonts/*.{eot,woff,woff2,ttf,svg}`,
    imagesfolder: `${partystreuselRoot}/images/`,
    images: [
      `${partystreuselRoot}/images/**/*`,
      `!${partystreuselRoot}/images/icons/*`,
    ],
    icons: `${partystreuselRoot}/images/icons/`,
    iconsystem: `${partystreuselRoot}/materials/atoms/icons`,
  },
  dest: {
    dir: 'dist',
    assets: 'dist/assets',
    // used for include path in fabricator assemble, default is 'assets/'.
    // use empty string for kirby setup
    fabricatorAssetFolder: 'assets/',
  },
};
const buildTasks = [
  'styles',
  'scripts:fabricator',
  'scripts:application',
  'polyfills',
  'scripts:vendor',
  'fonts',
  'images',
  'icons',
  'assemble',
];

// WEBPACK
// ----------------------------------------
const webpackConfigFabricator = require('./webpack.config.babel')(config, 'fabricator');
const webpackConfigStreusel = require('./webpack.config.babel')(config, 'streusel');

const webpackCompiler = webpack(webpackConfigFabricator);

// CLEAN
// ----------------------------------------
gulp.task('clean', () => del([
  config.dest.dir,
]));

// STYLES
// ----------------------------------------
gulp.task('styles:fabricator', () => {
  const styles = gulp.src(config.src.styles.fabricator)
    .pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixer())
    .pipe(gulpif(!config.dev, csso()))
    .pipe(rename('p.css'))
    .pipe(gulp.dest(`${config.dest.assets}/partystreusel/styles`))
    .pipe(gulpif(config.dev, browserSync.stream({ match: '**/*.css' })));

  return styles;
});

gulp.task('styles:application', () => {
  const styles = gulp.src(config.src.styles.application)
    .pipe(gulpif(config.dev, sourcemaps.init()))
    .pipe(sass({
      includePaths: ['node_modules'],
    }).on('error', notify.onError()))
    .pipe(autoprefixer())
    .pipe(gulpif(!config.dev, csso()))
    .pipe(gulpif(config.dev, sourcemaps.write('./')))
    .pipe(gulp.dest(`${config.dest.assets}/styles`))
    .pipe(gulpif(config.dev, browserSync.stream({ match: '**/*.css' })));

  return styles;
});

// Lint styles
gulp.task('styles:lint', () => {
  const processors = [
    stylelint(),
    // Pretty reporting config
    reporter({
      clearAllMessages: true,
      throwError: false,
    }),
  ];

  return gulp.src([
    `${partystreuselRoot}/**/*.scss`,
  ])
  .pipe(postcss(processors, { syntax: postcssSyntaxScss }));
});

gulp.task('styles', ['styles:lint', 'styles:fabricator', 'styles:application']);

// Check styles wit caniuse/doiuse
gulp.task('styles:doiuse', () => {
  const processors = [
    doiuse({
      browsers: metadata.browserlist,
      ignore: ['rem', 'flexbox'],
    }),
    // Pretty reporting config
    reporter({
      clearAllMessages: true,
      throwError: false,
    }),
  ];

  return gulp.src([
    `${partystreuselRoot}/**/*.scss`,
    `!${config.src.styles.fabricatorpartials}`,
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

gulp.task('scripts:application:lint', () => {
  gulp.src([
    config.src.scripts.application,
    `!${config.src.scripts.polyfills}`,
    config.src.scripts.config,
    config.src.scripts.materials,
    config.src.scripts.eslintRc,
    config.src.scripts.gulpFile,
    config.src.scripts.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(!config.dev, eslint.failAfterError()));
});

gulp.task('scripts:application:clean', () => del([
  config.dest.assets + config.src.scripts.applicationBundle,
]));

gulp.task('scripts:application', ['scripts:application:lint', 'scripts:application:clean'], () => {
  gulp.src([
    config.src.scripts.application,
    `!${config.src.scripts.polyfills}`,
  ])
    .pipe(named())
    .pipe(webpackStream(webpackConfigStreusel, webpack))
    .pipe(gulp.dest(`${config.dest.assets}/scripts/`));
});

gulp.task('polyfills', () => {
  gulp.src(config.src.scripts.polyfills)
    .pipe(named())
    .pipe(webpackStream({
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
      ],
    }, webpack))
    .pipe(gulp.dest(`${config.dest.assets}/scripts/`));
});

gulp.task('scripts:vendor', () => {
  gulp.src(config.src.scripts.vendorFiles)
    .pipe(gulp.dest(`${config.dest.assets}/scripts/`));
});

// IMAGES
// ----------------------------------------
gulp.task('images', () => {
  const images = gulp.src(config.src.images)
    .pipe(imagemin([
      imagemin.jpegtran({ progressive: true }),
    ]))
    .pipe(gulp.dest(config.src.imagesfolder))
    .pipe(gulp.dest(`${config.dest.assets}/images`));

  return images;
});

// ICONS
// ----------------------------------------
gulp.task('svgmin', () => {
  const svgs = gulp.src(`${config.src.icons}*.svg`)
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

  return svgs;
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
    .pipe(gulpif(/[.]svg$/, gulp.dest(`${config.dest.assets}/images/icons`)))
    .pipe(gulpif(/[.]html$/, rename('all-icons.html')))
    .pipe(gulpif(/[.]html$/, gulp.dest(config.src.iconsystem)));
});

// Icon workflow
gulp.task('icons', ['svgmin', 'svgsprite']);


// Fonts
// ----------------------------------------
gulp.task('fonts', () => {
  const fonts = gulp.src(config.src.fonts)
    .pipe(gulp.dest(`${config.dest.assets}/fonts`));

  return fonts;
});

// Assemble
// ----------------------------------------
gulp.task('assemble', (done) => {
  assemble({
    dest: config.dest.dir,
    logErrors: config.dev,
    layout: 'defaultTemplate',
    layouts: `${partystreuselRoot}/materials/templates/*.html`,
    layoutIncludes: `${config.src.fabricator}/layouts/includes/*`,
    views: [`${config.src.fabricator}/views/**/*`, `${partystreuselRoot}/pages/**/*`],
    materials: `${partystreuselRoot}/materials/**/!(_)*.html`,
    data: `${partystreuselRoot}/materials/**/*.{json,yml}`,
    docs: [`${config.src.docs}/**/*.md`, `${partystreuselRoot}/materials/**/*.md`],
    helpers: {
      assetsFolder() {
        return config.dest.fabricatorAssetFolder;
      },
      currentVersion() {
        return metadata.version;
      },
      projectName() {
        return metadata.name;
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
  const pages = gulp.src(`./${config.dest.dir}/**/*`)
    .pipe(ghPages());

  return pages;
});

gulp.task('deploy', () => {
  runSequence(
    'clean',
    buildTasks,
    'deploy:github',
  );
});

// SERVER
// ----------------------------------------
gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: config.dest.dir,
    },
    notify: false,
    logPrefix: 'FABRICATOR',
  });

  /**
   * Because webpackCompiler.watch() isn't being used
   * manually remove the changed file path from the cache
   */
  function webpackCache(e) {
    const keys = Object.keys(webpackConfigFabricator.cache);
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
      delete webpackConfigFabricator.cache[matchedKey];
    }
  }

  gulp.task('assemble:watch', ['assemble'], browserSync.reload);
  gulp.watch([`${config.src.docs}/*.md`, `${partystreuselRoot}/**/*.{html,md,json,yml}`], ['assemble:watch']);

  gulp.task('styles:fabricator:watch', ['styles:fabricator']);
  gulp.watch(config.src.styles.fabricatorpartials, ['styles:fabricator:watch']);

  gulp.task('styles:application:watch', ['styles:application']);
  gulp.watch([config.src.styles.config, config.src.styles.applicationpartials], ['styles:application:watch']);

  gulp.task('scripts:fabricator:watch', ['scripts:fabricator'], browserSync.reload);
  gulp.watch(config.src.scripts.fabricator, ['fabricator:watch']).on('change', webpackCache);

  gulp.task('scripts:application:watch', ['scripts:application'], browserSync.reload);
  gulp.watch([config.src.scripts.application, config.src.scripts.materials, config.src.scripts.config], ['scripts:application:watch']);

  gulp.task('images:watch', ['images'], browserSync.reload);
  gulp.watch(config.src.images, ['images:watch']);
});

gulp.task('build', ['default']);

// DEFAULT BUILD TASK
// ----------------------------------------
gulp.task('default', ['clean'], () => {
  runSequence(buildTasks, () => {
    if (config.dev) {
      gulp.start('serve');
    }
  });
});
