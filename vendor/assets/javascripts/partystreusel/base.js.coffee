window.Partystreusel = {}
window.Streusel = Partystreusel

class Partystreusel.Base

  @selector: ->
    ".streusel-#{@prototype.constructor.name.toLowerCase()}"

  @init: (element = $('body')) ->
    element.find(@selector()).each (i, el) =>
      new @(el)

  constructor: (el) ->
    @$el = $(el)
    @$el.data('object', @)
