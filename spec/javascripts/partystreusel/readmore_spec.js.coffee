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
      affix('[data-streusel-readmore]').html('Some Test text')
      @subject = Partystreusel.Readmore.init()[0]

    it 'renders an open button', ->
      @subject = @subject.renderButton('open')
      expect(@subject.text()).toEqual('Read more')
      expect(@subject).toHaveClass('button')
      expect(@subject).toHaveClass('open')

    it 'toggles button state', ->
      expect(@subject.buttonState()).toEqual('open')
      @subject.toggle()
      expect(@subject.buttonState()).toEqual('close')
      @subject.toggle()
      expect(@subject.buttonState()).toEqual('open')

  describe 'Readmore tag', ->

    beforeEach ->
      @subject = affix('[data-streusel-readmore]')
      @subject.html('Some Test text')
      Partystreusel.Readmore.init()

    it 'add a read more button to the div', ->
      expect(@subject).toContain('a.button')

    it 'moves text into a separate div', ->
      expect(@subject).toContain('div')
      expect(@subject.find('div')).toBeHidden()
      expect(@subject.find('div').html()).toEqual('Some Test text')

    it 'toggle button on click', ->
      @subject.find('.button').trigger('click')
      expect(@subject.find('.button')).toHaveClass('button')
      expect(@subject.find('.button')).toHaveClass('close')
      expect(@subject.find('div')).not.toHaveClass('hide')
      expect(@subject.find('div')).not.toHaveAttr('style')
      expect(@subject.find('div')).not.toBeHidden()
      @subject.find('.button').trigger('click')
      expect(@subject.find('.button')).toHaveClass('button')
      expect(@subject.find('.button')).toHaveClass('open')
      expect(@subject.find('div')).toHaveClass('hide')
      expect(@subject.find('div')).not.toHaveAttr('style')
      expect(@subject.find('div')).toBeHidden()
