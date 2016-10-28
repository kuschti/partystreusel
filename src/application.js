import 'babel-polyfill';

import Topbar from './materials/molecules/topbar/topbar.js'

$(function() {
  $('html').removeClass('no-js')

  Streusel.selectorType = 'css_class';
  Streusel.selectorPrefix = 'js';

  // Molecules
  Topbar.init();
}
