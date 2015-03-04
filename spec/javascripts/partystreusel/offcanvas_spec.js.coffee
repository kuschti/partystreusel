describe 'Offcanvas', ->

  it 'Streusel.Offcanvas exist', ->
    expect(Streusel.Offcanvas).toBeDefined()

  describe 'Readmore object', ->

    beforeEach ->
      @el = affix('.offcanvas[data-streusel-offcanvas] .js-offcanvas__toggler+.offcanvas__overlay')
      @subject = Partystreusel.Offcanvas.init()[0]
      spyOnEvent('.offcanvas', 'offcanvas-open')
      spyOnEvent('.offcanvas', 'offcanvas-close')

    it 'toggles correcty with togger', ->
      expect(@el).not.toHaveClass('offcanvas--open')
      $('.js-offcanvas__toggler').trigger('click')
      expect(@el).toHaveClass('offcanvas--open')
      $('.js-offcanvas__toggler').trigger('click')
      expect(@el).not.toHaveClass('offcanvas--open')

    it 'closes correctly with overlay', ->
      expect(@el).not.toHaveClass('offcanvas--open')
      $('.js-offcanvas__toggler').trigger('click')
      expect(@el).toHaveClass('offcanvas--open')
      $('.offcanvas__overlay').trigger('click')
      expect(@el).not.toHaveClass('offcanvas--open')

    it 'triggers events', ->
      $('.js-offcanvas__toggler').trigger('click')
      expect('offcanvas-open').toHaveBeenTriggeredOnAndWith('.offcanvas', @el[0])
      expect('offcanvas-close').not.toHaveBeenTriggeredOnAndWith('.offcanvas', @el[0])
      $('.js-offcanvas__toggler').trigger('click')
      expect('offcanvas-open').toHaveBeenTriggeredOnAndWith('.offcanvas', @el[0])
      expect('offcanvas-close').toHaveBeenTriggeredOnAndWith('.offcanvas', @el[0])
