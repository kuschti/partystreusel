const path = require('path');
const fractal = module.exports = require('@frctl/fractal').create();
const pkg = require(path.join(__dirname, 'package.json'));

fractal.set('project.title', 'Partystreusel');
fractal.set('project.version', pkg.version);

/*
 * Components.
 */
fractal.components.set('path', path.join(__dirname, 'patterns'));
fractal.components.set('label', 'Patterns');

/*
 * Documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));


fractal.web.set('builder.dest', path.join(__dirname, 'build'));

fractal.web.set('server.syncOptions', {
  open: true,
  browser: ['google chrome'],
  watchOptions: {
    ignoreInitial: true,
    ignored: ['**/*.scss'], // ignore the files you want webpack HMR to take care of
  },
});
