describe 'Base', ->

  describe 'class functions', ->

    beforeEach ->
      initSpy = jasmine.createSpy('initSpy')
      @initSpy = initSpy

      class MyClass extends Streusel.Base
        constructor: (el) ->
          initSpy()
          super(el)

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

    it 'does not double initialize objects', ->
      tag1 = affix('#c1[data-streusel-myclass]')
      objects = @subject.init()
      expect(objects.length).toEqual(1)
      expect(@initSpy).toHaveBeenCalled()

      @initSpy.reset()
      spyOn(Streusel, 'Base')
      objects = @subject.init()
      expect(objects.length).toEqual(0)
      expect(@initSpy).not.toHaveBeenCalled()
