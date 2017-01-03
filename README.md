# Partystreusel

## Getting started

You will need [Node.js](http://nodejs.org)
Use npm or[yarn](https://yarnpkg.com) as your package manager. 

    $ git clone https://github.com/brandleadership/partystreusel.git YOUR_APP_DIRECTORY
    $ cd YOUR_APP_DIRECTORY
    $ git remote rename origin upstream

    # Use node version defined in .nvrmc
    # if you use nvm as node version manager ->
    $ nvm use

    # Install dependencies (with npm or yarn)
    $ npm install
    $ yarn

    # Install Gulp globally if not already present
    $ npm install --global gulp
    $ yarn global add gulp

    # Run gulp to build all files
    $ gulp
    $ yarn run start

    # Or you can run in dev env to build & start a local server
    $ gulp --dev
    $ yarn run build


## Documentation

- [gulp tasks](docs/gulp.md)
- [javascript modules](docs/javascript.md)

## License information for included plugins
* Flickity may be used in commercial projects and applications with the one-time purchase of a commercial license. http://flickity.metafizzy.co/license.html
