describe 'Base', ->

  describe 'class functions', ->

    beforeEach ->
      class MyClass extends Streusel.Base

      @subject = MyClass

    it 'computes selector based on class name', ->
      expect(@subject.selector()).toEqual('[data-streusel-myclass]')

    it 'assigns object to tags', ->
      tag1 = affix('#c1[data-streusel-myclass]')
      tag2 = affix('#c2[data-streusel-myclass]')

      objects = @subject.init()
      expect(objects).toBeDefined()
      expect(objects.length).toEqual(2)
      expect(objects[0]).toBeDefined()

      expect(tag1.data('object')).toBeDefined()
      expect(tag1.data('object')).toEqual(objects[0])
      expect(tag2.data('object')).toBeDefined()
      expect(tag2.data('object')).toEqual(objects[1])

