describe 'Readmore', ->

  it 'Streusel.Readmore exist', ->
    expect(Streusel.Readmore).toBeDefined()

  describe 'class functions', ->

    beforeEach ->
      @subject = Partystreusel.Readmore

    it 'computes selector based on class name', ->
      expect(@subject.selector()).toEqual('[data-streusel-readmore]')

  describe 'Readmore object', ->

    beforeEach ->
      @el = affix('.readmore[data-streusel-readmore]').html('Some Test text')
      @subject = Partystreusel.Readmore.init()[0]
      spyOnEvent('.readmore', 'readmore-open')
      spyOnEvent('.readmore', 'readmore-close')

    it 'renders an open button', ->
      @subject = @subject.renderButton()
      expect(@subject.text()).toEqual('Read more')
      expect(@subject).toHaveClass('readmore__button')

    it 'toggles button state', ->
      expect(@subject.buttonState()).toEqual('open')
      @subject.toggle()
      expect(@subject.buttonState()).toEqual('close')
      @subject.toggle()
      expect(@subject.buttonState()).toEqual('open')

    it 'triggers events', ->
      $('.readmore__button').trigger('click')
      expect('readmore-open').toHaveBeenTriggeredOnAndWith('.readmore', @el[0])
      expect('readmore-close').not.toHaveBeenTriggeredOnAndWith('.readmore', @el[0])
      $('.readmore__button').trigger('click')
      expect('readmore-open').toHaveBeenTriggeredOnAndWith('.readmore', @el[0])
      expect('readmore-close').toHaveBeenTriggeredOnAndWith('.readmore', @el[0])

  describe 'Readmore tag', ->

    beforeEach ->
      @subject = affix('[data-streusel-readmore]')
      @subject.html('Some Test text')
      Partystreusel.Readmore.init()

    it 'add a read more button after readmore', ->
      expect(@subject.next()).toHaveClass('readmore__button')

    it 'toggle button on click', ->
      expect(@subject.next()).toHaveClass('readmore__button')
      expect(@subject).toHaveClass('readmore--closed')
      @subject.next().trigger('click')
      expect(@subject.next()).toHaveClass('readmore__button')
      expect(@subject).toHaveClass('readmore--opened')
      expect(@subject).not.toHaveAttr('style')
      expect(@subject).not.toBeHidden()
      @subject.next().trigger('click')
      expect(@subject.next()).toHaveClass('readmore__button')
      expect(@subject).toHaveClass('readmore--closed')
      expect(@subject).not.toHaveAttr('style')
      expect(@subject).toBeHidden()

  describe 'without content', ->

    beforeEach ->
      @subject = affix('[data-streusel-readmore]')
      @subject.html('  \n  ')
      Partystreusel.Readmore.init()

    it 'removes element when no content available', ->
      expect(@subject).not.toContain('a.button')

  describe 'with custom button', ->

    beforeEach ->
      @subject = affix('[data-streusel-readmore]+button.myclass.readmore__button').html('Some Test text')
      Partystreusel.Readmore.init()

    it 'uses custom button', ->
      expect(@subject.next()).toHaveClass('myclass')
