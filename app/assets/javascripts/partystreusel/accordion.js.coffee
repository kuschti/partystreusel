#= require partystreusel/base
#= require partystreusel/scroll_to

class Accordion extends Partystreusel.Base
  @className = 'Accordion'

  constructor: (el) ->
    super
    @$el.find('.accordion__title').on 'click', @toggleItem
    @items = @$el.find('.accordion__item')
    @offset = @$el.data('scroll-offset')

  toggleItem: (e) =>
    item = $(e.target).closest('.accordion__item')
    currentOpen = item.hasClass('accordion__item--open')

    @items.removeClass('accordion__item--open')
    item.toggleClass('accordion__item--open') unless currentOpen

    e.preventDefault()
    Partystreusel.scrollTo(item, @offset)

Partystreusel.Accordion = Accordion
