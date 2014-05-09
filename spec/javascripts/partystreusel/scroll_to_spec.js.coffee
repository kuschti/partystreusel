describe 'scrollTo', ->

  it 'function exist', ->
    expect(Partystreusel.scrollTo).toBeDefined()

  describe 'element finding', ->

    it 'scroll to returns false if element could not be found', ->
      expect(Partystreusel.scrollTo('.notexist')).toBe(false)

    it 'scrolls to selector', ->
      affix('.myselector')
      expect(Partystreusel.scrollTo('.myselector')).not.toBe(false)

    it 'scrolls link', ->
      affix('a[name="mylink"]')
      expect(Partystreusel.scrollTo(link: 'mylink')).not.toBe(false)

    it 'scrolls to jquery selection', ->
      tag = affix('a[name="mylink"]')
      expect(Partystreusel.scrollTo(tag)).not.toBe(false)

  describe 'offset', ->

    beforeEach ->
      @tag = affix('.myselector')

    it 'scrolls to jquery element', ->
      #expect(Partystreusel.scrollTo(@tag)[0]).toEqual(@tag[0])
      
