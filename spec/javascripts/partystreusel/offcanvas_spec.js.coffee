describe 'Offcanvas', ->

  it 'Streusel.Offcanvas exist', ->
    expect(Streusel.Offcanvas).toBeDefined()

  describe 'Readmore object', ->

    beforeEach ->
      @el = affix('[data-streusel-offcanvas] .js-offcanvas__toggler+.offcanvas__overlay')
      @subject = Partystreusel.Offcanvas.init()[0]

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
