describe 'Topbar', ->

  it 'Streusel.Topbar exist', ->
    expect(Streusel.Topbar).toBeDefined()

  describe 'Readmore object', ->

    beforeEach ->
      @el = affix('[data-streusel-accordion]')
      @item1 = @el.affix('.topbar__item')
      @item2 = @el.affix('.topbar__item')
      @item3 = @el.affix('.topbar__item')

      @subject = Partystreusel.Topbar.init()[0]
