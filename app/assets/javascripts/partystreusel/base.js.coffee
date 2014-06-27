#= require partystreusel/namespace
#= require partystreusel/ie_fixes
class Partystreusel.Base

  @selector: ->
    "[data-streusel-#{@prototype.constructor.name.toLowerCase()}]"

  @init: (element = $('body')) ->
    element.find(@selector())
      .filter (i, el) -> !($(el).data('object')?)
      .map (i, el) => new @(el)

  constructor: (el) ->
    @$el = $(el)
    @$el.data('object', @)
