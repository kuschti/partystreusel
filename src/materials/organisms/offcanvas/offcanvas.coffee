class Offcanvas extends Partystreusel.Base
  @className = 'Offcanvas'

  constructor: (el) ->
    super
    @$el.find('.js-offcanvas__toggler').on 'click', @toggle
    @$el.find('.offcanvas__overlay').on 'click', @toggle

  toggle: =>
    @$el.toggleClass('offcanvas--open')
    if @$el.hasClass('offcanvas--open')
      @trigger('open', @$el)
    else
      @trigger('close', @$el)

Partystreusel.Offcanvas = Offcanvas
