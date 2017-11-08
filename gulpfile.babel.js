import gulp from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import svgSymbols from 'gulp-svg-symbols';

// CONFIG
// ----------------------------------------
const partystreuselRoot = 'patterns';
const config = {
  src: {
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

// WATCHERS
// ----------------------------------------
gulp.task('watchers', () => {
  gulp.task('images:watch');
  gulp.watch(config.src.images, ['images:watch']);
});

// DEFAULT & BUILD TASK
// ----------------------------------------
gulp.task('build', ['images', 'icons']);
gulp.task('default', ['images', 'icons', 'watchers']);
