import Topbar from './materials/molecules/topbar/topbar';
import Accordion from './materials/molecules/accordion/accordion';
import Tab from './materials/molecules/tab/tab';
import Dropdown from './materials/molecules/dropdown/dropdown';
import Slider from './materials/molecules/slider/slider';
import Offcanvas from './materials/organisms/offcanvas/offcanvas';

function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  const html = document.querySelector('html');
  const Streusel = window.Streusel || {};

  html.classList.remove('no-js');

  Streusel.Topbar = Topbar.init();
  Streusel.Accordion = Accordion.init();
  Streusel.Tab = Tab.init();
  Streusel.Dropdown = Dropdown.init();
  Streusel.Slider = Slider.init();
  Streusel.Offcanvas = Offcanvas.init();
});
