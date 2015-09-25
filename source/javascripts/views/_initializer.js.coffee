$ ->
  # Document ready...
  I18n.locale = $('html').attr('lang') if I18n?

  Streusel.selectorType = 'css_class'
  Streusel.selectorPrefix = 'js'

  Streusel.Readmore.init()
  Streusel.Offcanvas.init()
  Streusel.Topbar.init()
  Streusel.Accordion.init()
  Streusel.Tab.init()
  Streusel.Slider.init()
