describe 'Readmore', ->

  it 'Streusel.Readmore exist', ->
    expect(Streusel.Readmore).toBeDefined()

  describe 'class functions', ->

    beforeEach ->
      @subject = Partystreusel.Readmore

    it 'computes selector based on class name', ->
      expect(@subject.selector()).toEqual('.streusel-readmore')

  describe 'Initialization', ->

    it 'finds all streusel-readmore divs', ->


