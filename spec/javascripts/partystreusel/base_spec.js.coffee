describe 'Base', ->

  describe 'class functions', ->

    beforeEach ->
      class MyClass extends Streusel.Base

      @subject = MyClass

    it 'computes selector based on class name', ->
      expect(@subject.selector()).toEqual('.streusel-myclass')

    it 'assigns object to tags', ->
      tag = affix('.streusel-myclass')
      @subject.init()
      expect(tag.data('object')).toBeDefined()

