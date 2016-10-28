import 'babel-polyfill';
import $ from 'jquery';
import Topbar from './materials/molecules/topbar/topbar';

$(() => {
  $('html').removeClass('no-js');

  Topbar.init();
});
