#= require partystreusel/namespace
class Partystreusel.Base

  @selector: ->
    "[data-streusel-#{@prototype.constructor.name.toLowerCase()}]"

  @init: (element = $('body')) ->
    element.find(@selector()).map (i, el) =>
      new @(el)

  constructor: (el) ->
    @$el = $(el)
    @$el.data('object', @)
