#=require namespace.coffee
#=require base.coffee

#=require 02-molecules/readmore/readmore.coffee
#=require 02-molecules/header/offcanvas.coffee
#=require 02-molecules/topbar/topbar.coffee
#=require 02-molecules/accordion/accordion.coffee
#=require 02-molecules/tab/tab.coffee
#=require 02-molecules/slider/slider.coffee
#=require 02-molecules/scroll_to/scroll_to.coffee

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
