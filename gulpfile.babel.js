import gulp from 'gulp';
import gulpif from 'gulp-if';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';
import imagemin from 'gulp-imagemin';
import svgSymbols from 'gulp-svg-symbols';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import postcss from 'gulp-postcss';
import postcssSyntaxScss from 'postcss-scss';
import reporter from 'postcss-reporter';
import stylelint from 'stylelint';

// CONFIG
// ----------------------------------------
const partystreuselRoot = 'patterns';
const config = {
  dev: process.env.NODE_ENV === 'development',
  src: {
    styles: {
      config: `${partystreuselRoot}/_config/*.scss`,
      application: `${partystreuselRoot}/main.scss`,
      applicationpartials: `${partystreuselRoot}/**/*.scss`,
    },
    fonts: `${partystreuselRoot}/01-atoms/fonts/*.{eot,woff,woff2,ttf,svg}`,
    imagesfolder: `${partystreuselRoot}/images/`,
    images: [
      `${partystreuselRoot}/images/**/*`,
      `!${partystreuselRoot}/images/icons/*`,
    ],
    icons: `${partystreuselRoot}/images/icons/`,
    iconsystem: `${partystreuselRoot}/01-atoms/icons`,
  },
  dest: {
    dir: 'build',
    assets: 'public',
  },
};
const buildTasks = [
  'styles',
  'fonts',
  'images',
  'icons',
];

// STYLES
// ----------------------------------------
gulp.task('styles:application', () => {
  const styles = gulp.src(config.src.styles.application)
    .pipe(gulpif(config.dev, sourcemaps.init()))
    .pipe(sass({
      includePaths: ['node_modules'],
    }).on('error', notify.onError()))
    .pipe(autoprefixer())
    .pipe(gulpif(!config.dev, csso()))
    .pipe(gulpif(config.dev, sourcemaps.write('./')))
    .pipe(gulp.dest(`${config.dest.assets}/css`));

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

gulp.task('styles', ['styles:lint', 'styles:application']);

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

// WATCHERS
// ----------------------------------------
gulp.task('watchers', () => {
  gulp.task('styles:application:watch', ['styles:application']);
  gulp.watch([config.src.styles.config, config.src.styles.applicationpartials], ['styles:application:watch']);

  gulp.task('images:watch', ['images']);
  gulp.watch(config.src.images, ['images:watch']);
});

// DEFAULT & BUILD TASK
// ----------------------------------------
gulp.task('build', ['default']);

gulp.task('default', () => {
  runSequence(buildTasks, () => {
    if (config.dev) {
      gulp.start('watchers');
    }
  });
});
