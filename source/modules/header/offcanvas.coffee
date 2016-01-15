class Offcanvas extends Partystreusel.Base
  @className = 'Offcanvas'

  constructor: (el) ->
    super
    @$el.find('.js-offcanvas__toggler').on 'click', @toggle
    @$el.find('.offcanvas__overlay').on 'click', @toggle
    @$el.find('.main-nav__link').on 'click', @toggleNavLink

  toggle: =>
    @$el.toggleClass('offcanvas--open')
    if @$el.hasClass('offcanvas--open')
      @trigger('open', @$el)
    else
      @trigger('close', @$el)

  toggleNavLink: (e) =>
    navLink = $(e.target).closest('.main-nav__link')
    subNav = navLink.next('.main-nav__sub')
    return if subNav.length == 0
    e.preventDefault()
    navLink.toggleClass('main-nav__link--active')
    subNav.toggleClass('main-nav__sub--open')

Partystreusel.Offcanvas = Offcanvas
