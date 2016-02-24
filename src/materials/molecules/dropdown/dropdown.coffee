class Dropdown extends Partystreusel.Base
  @className = 'Dropdown__Toggler'

  constructor: (el) ->
    super
    @parent = @$el.closest('.dropdown')
    @$el.on 'click', @toggleDropdown

  toggleDropdown: =>
    @parent.toggleClass('dropdown--open')

Partystreusel.Dropdown = Dropdown
