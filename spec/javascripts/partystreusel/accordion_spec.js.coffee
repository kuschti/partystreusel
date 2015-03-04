describe 'Accordion', ->

  it 'Streusel.Accordion exist', ->
    expect(Streusel.Accordion).toBeDefined()

  describe 'Readmore object', ->

    beforeEach ->
      @el = affix('.accordion[data-streusel-accordion]')
      @item1 = @el.affix('.accordion__item .accordion__title Title')
      @item2 = @el.affix('.accordion__item .accordion__title Title')
      @item3 = @el.affix('.accordion__item .accordion__title Title')

      @subject = Partystreusel.Accordion.init()[0]
      spyOnEvent('.accordion', 'accordion-open')
      spyOnEvent('.accordion', 'accordion-close')

    it 'toggles correcty', ->
      expect($('.accordion__item--open').length).toEqual(0)
      @item1.find('.accordion__title').trigger('click')
      expect($('.accordion__item--open').length).toEqual(1)
      @item2.find('.accordion__title').trigger('click')
      expect($('.accordion__item--open').length).toEqual(1)
      @item3.find('.accordion__title').trigger('click')
      expect($('.accordion__item--open').length).toEqual(1)
      @item3.find('.accordion__title').trigger('click')
      expect($('.accordion__item--open').length).toEqual(0)

    it 'triggers events', ->
      @item1.find('.accordion__title').trigger('click')
      expect('accordion-open').toHaveBeenTriggeredOnAndWith('.accordion', @item1[0])
      expect('accordion-close').not.toHaveBeenTriggeredOnAndWith('.accordion', @item1[0])
      @item1.find('.accordion__title').trigger('click')
      expect('accordion-open').toHaveBeenTriggeredOnAndWith('.accordion', @item1[0])
      expect('accordion-close').toHaveBeenTriggeredOnAndWith('.accordion', @item1[0])
