window.SC ||= {}

class SC.Photo extends Backbone.Model

  show: (effect) ->
    this.trigger("show:" + effect)

  hide: (effect) ->
    this.trigger("hide:" + effect)