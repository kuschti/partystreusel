class Topbar extends Partystreusel.Base
  @className = 'Topbar'

  constructor: (el) ->
    super
    @$el.find('.topbar__mobile-menu').on 'click', @toggle
    @$el.find('.topbar__item').on 'click', @toggleItem

  toggle: (e) =>
    @$el.toggleClass('topbar--open')

  toggleItem: (e) =>
    item = $(e.target).closest('.topbar__item')
    subList = item.find('.topbar__sub-list')
    return if subList.length == 0

    subList.toggleClass('topbar__sub-list--open')
    e.preventDefault()

Partystreusel.Topbar = Topbar
