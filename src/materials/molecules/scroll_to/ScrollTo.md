Add to your module js

    import ScrollTo from '../../../materials/molecules/scroll_to/scrollTo';

This is just a function. Usage:

    # scroll to a[name=linkname]
    ScrollTo.to(link: 'linkname');

    # scroll to selector
    ScrollTo.to('selector');

    # scroll to jquery element
    ScrollTo.to($('selector'));

    # you can scroll to element with a pixeloffset
    # selector will be 12px below window top
    ScrollTo.to('selector', offset: -12)

hint: If element to scroll to could not be found, the function returns
false. If element was found, return the found jquery element.
