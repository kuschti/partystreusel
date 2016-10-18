class Accordion extends Partystreusel.Base
  @className = 'Accordion'

  constructor: (el) ->
    super
    @$el.find('.accordion__title').on 'click', @toggleItem
    @items = @$el.find('.accordion__item')
    @offset = @$el.data('scroll-offset')

  toggleItem: (e) =>
    item = $(e.target).closest('.accordion__item')
    currentOpen = item.hasClass('accordion--open')

    @items.filter('.accordion--open').each (_, i) =>
      @trigger('close', $(i))

    @items.removeClass('accordion--open')
    unless currentOpen
      item.toggleClass('accordion--open')
      @trigger('open', item)

    e.preventDefault()
    Partystreusel.scrollTo(item, @offset)

Partystreusel.Accordion = Accordion
