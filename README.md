[![Build Status](https://travis-ci.org/screenconcept/partystreusel.svg?branch=development)](https://travis-ci.org/screenconcept/partystreusel)
# Partystreusel

## Installation

Add **partystreusel** to your Gemfile `gem 'partystreusel'` and bundle.

Partystreusel depends on i18n-js. Make sure you followed install
instructions on: https://github.com/fnando/i18n-js

Include in your application.js.coffee:

    #= require partystreusel/<<modulename>>

    $ ->
      Streusel.<<Modulename>>.init()

For example for readmore:

    #= require i18n
    #= require partystreusel/translations
    #= require partystreusel/readmore

    $ ->
      Streusel.Readmore.init()

If you only want to initialize readmore for a part of the document:

    Streusel.Readmore.init($('body article.loadedwithajax'))

# Module Usage

Available modules:
* Streusel.scrollTo
* Streusel.Readmore

## Scroll To

Add to applicaiton.js.coffee:

    #= require partystreusel/scroll_to

This is just a function. Usage:

    # scroll to a[name=linkname]
    Streusel.scrollTo(link: 'linkname')

    # scroll to selector
    Streusel.scrollTo('selector')

    # scroll to jquery element
    Streusel.scrollTo($('selector'))

    # you can scroll to element with a pixeloffset
    # selector will be 12px below window top
    Streusel.scrollTo('selector', offset: -12)

hint: If element to scroll to could not be found, the function returns
false. If element was found, return the found jquery element.

## Read More

Use code below depending on environment you are in. If the content is
empty or contains only whitespaces, nothing will be displayed.

Readmore depends on translations and i18n js, add this to your
application.js.coffee

    #= require i18n
    #= require partystreusel/translations
    #= require partystreusel/readmore

    $ ->
      Streusel.Readmore.init()

### Rails

    - readmore do
      Your text....

You can use any haml tag option. E.g.

    - readmore(class: 'mycustomclass') do
      Your text....

### Html

    <div class='mycustomclass' data-streusel-readmore>
      Your text....
    </div>

Will be rendered to something like:

    <div class='mycustomclass' data-streusel-readmore>
      <div>Your text....</div>
      <a ...>Read more</a>
    </div>

## Foundation Helpers

Add to applicaiton.js.coffee:

    #= require partystreusel/foundation_helpers

Available Functions:

    Streusel.FoundationHelpers.isLarge()
    Streusel.FoundationHelpers.isMedium()
    Streusel.FoundationHelpers.isSmall()

## Development

Test with

    bundle exec guard

Or run the yasmine test directly with:

    bundle exec guard-jasmine

Compare documentation on: https://github.com/netzpirat/guard-jasmine

Help for jasmine testing:
* http://jasmine.github.io/1.3/introduction.html

To help testing the following jasmine helpers are installed:
* https://github.com/searls/jasmine-fixture
* https://github.com/velesin/jasmine-jquery
