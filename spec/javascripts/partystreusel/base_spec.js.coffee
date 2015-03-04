describe 'Base', ->

  describe 'class functions', ->

    beforeEach ->
      Streusel.selectorPrefix = undefined
      Streusel.selectorType = undefined
      initSpy = jasmine.createSpy('initSpy')
      @initSpy = initSpy

      class MyClass extends Streusel.Base
        @className = 'MyClass'

        constructor: (el) ->
          initSpy()
          super(el)

      @subject = MyClass

    it 'computes selector based on class name', ->
      Streusel.selectorPrefix = 'js'
      Streusel.selectorType = 'css_class'
      expect(@subject.selector()).toEqual('.js-myclass')

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

    it 'triggers an event', ->
      tag1 = affix('#c1[data-streusel-myclass]')
      @subject = @subject.init()[0]
      spyOn(@subject.$el, 'trigger')
      @subject.trigger('myevent', 'arg1', 'arg2')
      expect(@subject.$el.trigger).toHaveBeenCalledWith('myclass-myevent', 'arg1', 'arg2');

