import 'babel-polyfill';
import $ from 'jquery';
import Topbar from './materials/molecules/topbar/topbar';
import Accordion from './materials/molecules/accordion/accordion';
import Tab from './materials/molecules/tab/tab';

$(() => {
  $('html').removeClass('no-js');

  Topbar.init();
  Accordion.init();
  Tab.init()
});
