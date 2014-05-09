[![Build Status](https://travis-ci.org/screenconcept/partystreusel.svg?branch=development)](https://travis-ci.org/screenconcept/partystreusel)
# Partystreusel

## Installation

Add **partystreusel** to your Gemfile `gem 'partystreusel'` and bundle.

Partystreusel depends on i18n-js. Make sure you followed install
instructions on: https://github.com/fnando/i18n-js

Include in your application.js.coffee:

    #= require partystreusel/<<modulename>>

    Streusel.<<Modulename>>.init()

For example for readmore:

    #= require partystreusel/readmore

    ->
      Streusel.Readmore.init()

If you only want to initialize readmore for a part of the document:

    Stresuel.Readmore.init($('body article.loadedwithajax'))

# Module Usage

Available modules:
* Streusel.Readmore

## Read More

Use code below depending on environment you are in. If the content is
empty or contains only whitespaces, nothing will be displayed.

### Rails

    - readmore do
      Your text....

### Html

    <div data-streusel-readmore>
      Your text....
    </div>

## Development

Test with

    bundle exec guard

Or just one run

    bundle exec guard-jasmine

Compare documentation on: https://github.com/netzpirat/guard-jasmine

To help testing the following jasmine helpers alre installed:
* https://github.com/searls/jasmine-fixture
* https://github.com/velesin/jasmine-jquery

