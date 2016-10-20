# CHANGELOG

## v4.5.2
* update normalize to v5.0.0
* include normalize with npm instead of vendor file

## v4.5.1
* add handlebars helper "increment"

## v4.5.0
* remove molecules teaser, linklist, iconbar
* remove jquery cycle plugin (used for slider)
* add vendor flickity.js (used for slider)
* update vendor jquery to 3.1.1
* update node version in nvrmc
* update dependencies
* update colors
* update placeholder images
* update active class names in topbar, main-nav, accordion (BREAKING)
* update main-nav & header styles
* update header (remove offcanvas, BREAKING)
* add offcanvas organism (in progress)

## 4.4.1
* node v4.5.0 is defined in nvrmc
* update dependencies
* fix image markup

## 4.4.0
* update color variables (naming)
* update button styles
* replace button class `btn--secondary` with `btn--primary`
* remove read-more molecule
* update npm script tasks
* update dependencies

## 4.3.0
* add stylelint rules
* lint styles (descending specificity)
* update gulp deploy task to run clean/build/deploy:github
* update use of Sass color variables
* update dependencies

## 4.2.1
* add styling for styleguide notes
* update dependencies

## 4.2.0
* move grid from molecules to atoms
* update stylelint config as dependency (stylelint-config-partystreusel)
* update gulp tasks for imagemin (because of imagemin update)
* update dependencies

## 4.1.1
* fix gulp task "svgsprite"
* fix no-js handling

## 4.1.0
* lint styles
* refactor switch
* improve form semantic

### packages/gulp
* add stylelint
* add gulp-uglify
* update gulpfile
  * run csso in production
  * improve minify of images/icons
* update dependencies
* remove scss-lint
* remove polyfills
  * html5shiv
  * rem

## 4.0.0
* change structure to atomic design
* use fabricator-assemble package
* switch from jade to html (with handlebars)
* extend media-query mixin
* simplify icon system
  * remove gulpicon, remove png fallbacks
* update dependencies
* define node.js version to v4.4.1 in nvrmc

## 3.2.3
* fix typo.scss
* cleanup gulfpile & requires
* add font files handling in gulp
* add .editorconfig
* update dependencies

## 3.2.2
* fix back-to-index link
* add no-js styling for offcanvas

## 3.2.1
* add header styles
* update vendor files
  * normalize to v3.0.2
  * jquery to v2.2.0
  * modernizr to v3.3.0

## 3.2.0
* add markdown documentation for jade files (via block)
* change jade blocks
* change icon preview
* change sass variable naming
* add word-break mixin
* rename utility classes
* remove offcanvas & main-nav from layout, now modules

## 3.1.0
* add autoprefixer (remove prefixin with bourbon)
* add sourcemaps for Sass
* add sftp deploy
* add gh-pages deploy
* update gulp plugins
* change to modular file structure
* change Sass variables to BEM style

## 3.0.0
* switch from grunt to gulp
* replace grunticon with gulpicon
* switch from sass to scss syntax
* switch from haml to jade
* add browser-sync for local server
* add gulp compilation of sass, coffee, jade, bourbon, neat, icons, ...
* add .nvrmc file for nvm
* add scss-lint.yml (for local scss-lint in e.g. sublime) with rules
* lint all sass files
* remove ruby & middleman dependency

## 2.0.0

* Last release for rails&middleman
* fix engine mounting
* a few bugfixes

## 1.2.0

* Various modules added/moved over from rails_template

## 1.1.1
* Mark offcanvas active link

## v1.1.0
* Refactored Readmore
* Add Offcanvas, Tab, Accordion, Slider JS
* Add events

## v1.0.8
* IE8 fixes (readmore, ie_fixes did not work in IE8)

## v1.0.7
* Fixed issue which broke streusel when minified.

## v1.0.6
* Make partystreusel loadable in middleman

## v1.0.5
* Updated readmore translations (Show less, Weniger anzeigen)

## v1.0.3 - 2014-06-23
* IE Bugfix (toDownCase error)

## v1.0.0 - 2014-06-05

* Complete rework with jasmine testing
* Implemented modules:
  * Read More
  * Scroll To
