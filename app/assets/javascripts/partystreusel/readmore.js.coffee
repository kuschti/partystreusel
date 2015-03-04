#= require partystreusel/base

class Readmore extends Partystreusel.Base
  @className = 'Readmore'

  constructor: (el) ->
    super
    return if $.trim(@$el.text()) == ''

    unless @$el.hasClass('readmore--opened') || @$el.hasClass('readmore--closed')
      @$el.addClass('readmore--closed')

    @button = @$el.next()
    unless @button.hasClass('readmore__button')
      @button = @renderButton()
      @button.insertAfter(@$el)

    $(@button).bind 'click', @toggle

  toggle: (event) =>
    @$el.slideToggle =>
      @$el.toggleClass('readmore--opened readmore--closed')
      @button.text(@buttonText())
      @$el.css('display', "")
      @$el.removeAttr('style') if @$el.attr('style') == ''
      if @$el.hasClass('readmore--opened')
        @trigger('open', @$el)
      else
        @trigger('close', @$el)
    return false

  buttonState: ->
    return 'close' if @$el.hasClass('readmore--opened')
    'open'

  buttonText: (state = @buttonState()) ->
    I18n.t("readmore.button_text.#{state}")

  renderButton: =>
    text = @buttonText()

    $('<a></a>')
      .addClass('readmore__button')
      .attr('href', '#')
      .html(text)

Partystreusel.Readmore = Readmore
