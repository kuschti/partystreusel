# Partystreusel

## Getting started

You will need [Node.js](http://nodejs.org)
Use [yarn](https://yarnpkg.com) as your package manager, or npm. 

    $ git clone https://github.com/brandleadership/partystreusel.git YOUR_APP_DIRECTORY --depth 1
    $ cd YOUR_APP_DIRECTORY
    $ git remote rename origin upstream

    # Use node version defined in .nvrmc
    # if you use nvm as node version manager ->
    $ nvm use

    # Install dependencies (with npm or yarn)
    $ yarn install

    # Install Gulp globally if not already present
    $ yarn global add gulp

    # Run gulp to build all files
    $ yarn start

    # Or you can run in dev env to build & start a local server
    $ yarn build


## Documentation

- [gulp tasks](docs/gulp.md)
- [javascript modules](docs/javascript.md)

## License information for included plugins
* Flickity may be used in commercial projects and applications with the one-time purchase of a commercial license. http://flickity.metafizzy.co/license.html
