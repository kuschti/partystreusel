describe 'Tab', ->

  it 'Streusel.Tab exist', ->
    expect(Streusel.Tab).toBeDefined()

  describe 'Readmore object', ->

    beforeEach ->
      @el = affix('.tab[data-streusel-tab]')

      @navItem1 = @el.affix('.tab__nav-item a[href="#panel1"]')
      @navItem2 = @el.affix('.tab__nav-item a[href="#panel2"]')
      @navItem3 = @el.affix('.tab__nav-item a[href="#panel3"]')

      @panel1 = @el.affix('.tab__panel[id=panel1]')
      @panel2 = @el.affix('.tab__panel[id=panel2]')
      @panel3 = @el.affix('.tab__panel[id=panel3]')

      @subject = Partystreusel.Tab.init()[0]
      spyOnEvent('.tab', 'tab-open')
      spyOnEvent('.tab', 'tab-close')

    it 'has correct references', ->
      expect(@subject.$navItems.length).toEqual(3)
      expect(@subject.$panels.length).toEqual(3)

    it 'opens correct panels', ->
      @subject.openPanel(1)
      expect(@subject.currentPanelName()).toEqual('panel2')

      @subject.openPanel('panel3')
      expect(@subject.currentPanelName()).toEqual('panel3')

    it 'opens the first tab automatically', ->
      expect($('.tab__panel--active').length).toEqual(1)
      expect($('.tab__nav-item--active').length).toEqual(1)
      expect(@panel1).toHaveClass('tab__panel--active')

    it 'opens panels by click', ->
      @navItem2.trigger('click')
      expect(@panel2).toHaveClass('tab__panel--active')
      @navItem3.trigger('click')
      expect(@panel3).toHaveClass('tab__panel--active')
      @navItem3.trigger('click')
      expect(@panel3).toHaveClass('tab__panel--active')

    it 'triggers events', ->
      @navItem2.trigger('click')
      expect('tab-close').toHaveBeenTriggeredOnAndWith('.tab', 'panel1', @navItem1[0], @panel1[0])
      expect('tab-open').toHaveBeenTriggeredOnAndWith('.tab', 'panel2', @navItem2[0], @panel2[0])
