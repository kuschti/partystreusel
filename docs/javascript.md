# JS

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

## Module Usage

Available modules:
* Streusel.scrollTo
* Streusel.Readmore

### Scroll To

Add to application.js.coffee:

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

### Read More

Use code below depending on environment you are in. If the content is
empty or contains only whitespaces, nothing will be displayed.

    #= require partystreusel/readmore

    $ ->
      Streusel.Readmore.init()

If you only want to initialize readmore for a part of the document:

    Streusel.Readmore.init($('body article.loadedwithajax'))

#### Html

    <div class='mycustomclass' data-streusel-readmore>
      Your text....
    </div>

Will be rendered to something like:

    <div class='mycustomclass' data-streusel-readmore>
      <div>Your text....</div>
      <a ...>Read more</a>
    </div>
