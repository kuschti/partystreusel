[![Build Status](https://travis-ci.org/screenconcept/partystreusel.svg?branch=master)](https://travis-ci.org/screenconcept/partystreusel)
# Partystreusel

## Installation Rails

Add **partystreusel** to your Gemfile `gem 'partystreusel'` and bundle.

Partystreusel depends on i18n-js. Make sure you followed install
instructions on: https://github.com/fnando/i18n-js

Include in your application.js.coffee:

    #= require partystreusel/<<modulename>>

    $ ->
      Streusel.selectorType = 'css_class'
      Streusel.selectorPrefix = 'js'

      Streusel.<<Modulename>>.init()

For example for readmore:

    #= require i18n
    #= require partystreusel/translations
    #= require partystreusel/readmore

    $ ->
      Streusel.selectorType = 'css_class'
      Streusel.selectorPrefix = 'js'

      Streusel.Readmore.init()

If you only want to initialize readmore for a part of the document:

    Streusel.Readmore.init($('body article.loadedwithajax'))

## JS <-> DOM

If you have the JS object use

    myJsObject.$el

to access the corresponding DOM element.

If you have the DOM element use

    $('.myselector').data('object')

to access the correspoindg partystreusel JS object.

## Events

Partystreusel components tirgger some events. All events are
prefixed with the moulename. Eg. Readmore triggers the event
'readmore-open' and 'readmore-close'.

You can trigger an event directly on the JS object. Eg.
if you have a readmore object:

    readmoreObject = $('.myreadmore).data('object')
    readmoreObject.trigger('myevent')

Would triger a new event on $('.myreadmore') with name 
'readmore-event'.

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

In order to run the test suite, phantomjs 1.8.2 must be installed. With
homebrew, use `brew install phantomjs182`.

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
