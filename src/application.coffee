#=require namespace.coffee
#=require base.coffee

#=require materials/molecules/topbar/topbar.coffee
#=require materials/molecules/accordion/accordion.coffee
#=require materials/molecules/tab/tab.coffee
#=require materials/molecules/slider/slider.coffee
#=require materials/molecules/scroll_to/scroll_to.coffee
#=require materials/molecules/dropdown/dropdown.coffee

#=require materials/organisms/offcanvas/offcanvas.coffee

$ ->
  $('html').removeClass('no-js')

  # Document ready...
  Streusel.selectorType = 'css_class'
  Streusel.selectorPrefix = 'js'

  Streusel.Offcanvas.init()
  Streusel.Topbar.init()
  Streusel.Accordion.init()
  Streusel.Tab.init()
  Streusel.Slider.init()
  Streusel.Dropdown.init()
