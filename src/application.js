import 'babel-polyfill';
import $ from 'jquery';
import Topbar from './materials/molecules/topbar/topbar';
import Accordion from './materials/molecules/accordion/accordion';

$(() => {
  $('html').removeClass('no-js');

  Topbar.init();
  Accordion.init();
});
