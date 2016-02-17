'use strict';

// modules

var include       = require('gulp-include'),
    concat        = require('gulp-concat'),
    flatten       = require('gulp-flatten'),
    addsrc        = require('gulp-add-src'),
    plumber       = require('gulp-plumber'),
    notify        = require('gulp-notify'),
    coffee        = require("gulp-coffee"),
    jade          = require('gulp-jade'),
    svgSymbols    = require('gulp-svg-symbols'),
    glob          = require('glob'),
    gulpicon      = require('gulpicon/tasks/gulpicon'),
    sftp          = require('gulp-sftp'),
    ghPages       = require('gulp-gh-pages'),
    metadata      = require('./package.json');


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
var imagemin      = require('gulp-imagemin');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var bourbon       = require('node-bourbon').includePaths;
var neat          = require('node-neat').includePaths;
var autoprefixer  = require('gulp-autoprefixer');

// configuration
var config = {
	dev: gutil.env.dev === true ? true : false,
	src: {
		scripts: {
			fabricator: './src/_styleguide/fabricator/scripts/fabricator.js',
			toolkit: './src/_styleguide/fabricator/scripts/fabricator.js'
		},
		styles: {
			fabricator: 'src/_styleguide/fabricator/styles/fabricator.scss',
			toolkit: 'src/application.scss'
		},
		images: 'src/images/**/*',
		views: 'src/_styleguide/fabricator/views/*.html'
	},
	dest: 'dist',
  browsers: ['last 2 versions', 'ie 9', '> 1%']
};

// webpack
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);

// clean
gulp.task('partystreusel:clean', function () {
	return del([config.dest]);
});

// styles
gulp.task('partystreusel:styles:fabricator', function () {
	return gulp.src(config.src.styles.fabricator)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(config.browsers))
		.pipe(gulpif(!config.dev, csso()))
		.pipe(rename('f.css'))
		.pipe(gulp.dest(config.dest + '/assets/fabricator/styles'))
		.pipe(gulpif(config.dev, browserSync.reload({stream:true})));
});

gulp.task('partystreusel:styles:toolkit', function () {
	return gulp.src(config.src.styles.toolkit)
		.pipe(sass({
        includePaths: neat
      })
    .on('error', sass.logError))
		.pipe(autoprefixer(config.browsers))
		.pipe(gulpif(!config.dev, csso()))
		.pipe(gulp.dest(config.dest + '/assets/styles'))
		.pipe(gulpif(config.dev, browserSync.reload({stream:true})));
});

gulp.task('partystreusel:styles', ['partystreusel:styles:fabricator', 'partystreusel:styles:toolkit']);

// scripts
gulp.task('partystreusel:scripts', function (done) {
	webpackCompiler.run(function (error, result) {
		if (error) {
			gutil.log(gutil.colors.red(error));
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


// images
gulp.task('partystreusel:images', function () {
	return gulp.src(config.src.images)
		.pipe(imagemin())
		.pipe(gulp.dest(config.dest + '/assets/toolkit/images'));
});

// assemble
gulp.task('partystreusel:assemble', function (done) {
	assemble({
		logErrors: config.dev,
    layouts: 'src/_styleguide/fabricator/layouts/*',
    layoutIncludes: 'src/_styleguide/fabricator/layouts/includes/*',
    views: 'src/_styleguide/fabricator/views/**/*',
    materials: 'src/materials/**/*.{html}',
    data: 'src/materials/**/*.{json,yml}',
    docs: ['docs/**/*.md', 'src/materials/**/*.md']
	});
	done();
});

// server
gulp.task('partystreusel:serve', function () {

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

	gulp.task('partystreusel:assemble:watch', ['partystreusel:assemble'], browserSync.reload);
	gulp.watch('src/**/*.{html,md,json,yml}', ['partystreusel:assemble:watch']);

	gulp.task('partystreusel:styles:fabricator:watch', ['partystreusel:styles:fabricator']);
	gulp.watch('src/_styleguide/fabricator/styles/**/*.scss', ['partystreusel:styles:fabricator:watch']);

	gulp.task('partystreusel:styles:toolkit:watch', ['partystreusel:styles:toolkit']);
	gulp.watch('src/**/*.scss', ['partystreusel:styles:toolkit:watch']);

	gulp.task('partystreusel:scripts:watch', ['partystreusel:scripts'], browserSync.reload);
	gulp.watch('src/_styleguide/fabricator/scripts/**/*.js', ['partystreusel:scripts:watch']).on('change', webpackCache);

	gulp.task('partystreusel:images:watch', ['partystreusel:images'], browserSync.reload);
	gulp.watch(config.src.images, ['partystreusel:images:watch']);

});

gulp.task('partystreusel', ['default']);

// default build task
gulp.task('default', ['partystreusel:clean'], function () {
	// define build tasks
	var tasks = [
		'partystreusel:styles',
		'partystreusel:scripts',
		'partystreusel:images',
		'partystreusel:assemble'
	];

	// run build
	runSequence(tasks, function () {
		if (config.dev) {
			gulp.start('partystreusel:serve');
		}
	});

});

//------------------------------------------------------------------------------
// OLD STREUSEL

var paths = {
  images:       'src/images/*',
  fonts:        'src/core/fonts/*.{eot,woff,woff2,ttf,svg}',
  icons:        'src/ui/icons/svg/*.svg',
  coffee:       'src/**.coffee',
  vendor:       'src/vendor/*.js',
  polyfills:    'src/vendor/polyfills/*',
  sass:         'src/**/*.scss',
  markdown:     ['src/core/**/*.md',
                'src/ui/**/*.md',
                'src/modules/**/*.md'],
  jade:         ['src/index.jade',
                'src/core/**/!(_)*.jade',
                'src/ui/**/!(_)*.jade',
                'src/modules/**/!(_)*.jade'],
  jadePartials: 'src/partials/*.jade',
  remotePath:   '/home/www-data/swisscom_tell_styleguide/'
}

// STYLES
// ----------------------------------------
gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: neat
    }).on('error', notify.onError()))
    .pipe(autoprefixer(config.browsers))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({stream: true}))
});

// JADE
// ----------------------------------------
gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade({
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
      templates: ['src/ui/icons/templates/icon-sprite.svg']
    }))
    .pipe(gulp.dest('dist/images/icons'));
});

var gulpiconFiles = glob.sync(paths.icons),
    gulpiconOptions = {
      dest: 'dist/images/icons',
      cssprefix: '.icon--',
      pngpath: "images/icons/png",
      pngfolder: 'png',
      previewhtml: "../../../src/ui/icons/icons.jade",
      template: 'src/ui/icons/templates/_icons_stylesheet.hbs',
      previewTemplate: 'src/ui/icons/templates/_icons_preview.hbs'
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

// Fonts
// ----------------------------------------
gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
   .pipe(gulp.dest('./dist/fonts'));
});

// Watch for file changes
// ----------------------------------------
gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.icons, ['icons']);
  gulp.watch(paths.coffee, ['js:coffee']);
  gulp.watch([paths.jade, paths.markdown, paths.jadePartials], ['jade']);
});

// Clean all dist files
// ----------------------------------------
gulp.task('clean', function () {
	return del([config.dest]);
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

// DEPLOY
// ----------------------------------------
gulp.task('deploy', function () {
  return gulp.src('dist/**/*')
    .pipe(sftp({
      host: 'php1.brandleadership.ch',
      user: 'www-data',
      remotePath: paths.remotePath
    }));
});

gulp.task('deploy:github', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// Default & build tasks
// ----------------------------------------
gulp.task('old', ['clean', 'build'], function() {
  gulp.start('browser-sync', 'watch');
});

gulp.task('serve', ['browser-sync', 'watch']);

gulp.task('build', ['clean'], function() {
  gulp.start('icons', 'fonts', 'imagemin', 'sass', 'js:coffee', 'js:polyfills', 'jade');
});
