#=require core/namespace.coffee
#=require core/base.coffee

#=require modules/readmore/readmore.coffee
#=require modules/offcanvas/offcanvas.coffee
#=require modules/topbar/topbar.coffee
#=require modules/accordion/accordion.coffee
#=require modules/tab/tab.coffee
#=require modules/slider/slider.coffee
#=require modules/scroll_to/scroll_to.coffee

$ ->
  # Document ready...
  Streusel.selectorType = 'css_class'
  Streusel.selectorPrefix = 'js'

  Streusel.Readmore.init()
  Streusel.Offcanvas.init()
  Streusel.Topbar.init()
  Streusel.Accordion.init()
  Streusel.Tab.init()
  Streusel.Slider.init()
