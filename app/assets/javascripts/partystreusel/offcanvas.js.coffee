#= require partystreusel/base

class Offcanvas extends Partystreusel.Base
  @className = 'Offcanvas'

  constructor: (el) ->
    super
    @$el.find('.js-offcanvas__toggler').on 'click', @toggle
    @$el.find('.offcanvas__overlay').on 'click', @toggle
    @$el.find('.offcanvas-nav__link').on 'click', @toggleNavLink

  toggle: =>
    @$el.toggleClass('offcanvas--open')

  toggleNavLink: (e) =>
    navLink = $(e.target).closest('.offcanvas-nav__link')
    subNav = navLink.next('.offcanvas-nav__sub')
    return if subNav.length == 0
    e.preventDefault()
    subNav.toggleClass('offcanvas-nav__sub--open')

Partystreusel.Offcanvas = Offcanvas
