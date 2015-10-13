# Partystreusel

## Getting started

You will need [Node.js](http://nodejs.org) and [Ruby](https://www.ruby-lang.org)


    $ git clone https://github.com/screenconcept/partystreusel.git YOUR_APP_DIRECTORY
    $ cd YOUR_APP_DIRECTORY
    $ git remote rename origin upstream

    # Install dependencies
    $ bundle
    $ npm install

    # Install Gulp globally if not already present
    $ npm install --global gulp

    # Run gulp to build css files
    $ gulp build

    # Run middleman to start middleman server
    $ bundle exec middleman

    # To view styleguide, open http://localhost:4567 in your browser

## Documentation

- [gulp tasks](docs/gulp.md)
- [javascript modules](docs/javascript.md)
