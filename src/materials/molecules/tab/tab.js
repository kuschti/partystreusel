import tabby from 'tabbyjs';
import Base from '../../../_config/base';

class Tab extends Base {
  constructor(el) {
    super(el);

    tabby.init({
      selectorToggle: '[data-tab]', // Tab toggle selector
      selectorToggleGroup: '[data-tabs]', // Tab toggle group selector
      selectorContent: '[data-tabs-pane]', // Tab content selector
      selectorContentGroup: '[data-tabs-content]', // Tab content group selector
      toggleActiveClass: 'tab--active', // Class added to active toggle elements
      contentActiveClass: 'tab--active', // Class added to active tab content areas
      initClass: 'js-tabby', // Class added to <html> element when initiated
      stopVideo: true, // [Boolean] If true, stop videos when tab closes
    });
  }
}

Tab.className = 'Tab';
export default Tab;
