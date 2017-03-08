import $ from 'jquery';
import Base from '../../../_config/base';

class Tab extends Base {
  constructor(el) {
    super(el);
    this.$navItems = this.$el.find('.tab__nav-item');
    this.$panels = this.$el.find('.tab__panel');
    this.$el.find('.tab__nav-item').on('click', this.openItem.bind(this));

    if (window.location.hash) {
      this.openPanel(window.location.hash);
    }

    if (this.currentPanelName() == null) {
      this.openPanel(0);
    }
  }

  openItem(e) {
    const item = $(e.target).closest('.tab__nav-item');
    const name = item.find('[href]').attr('href');
    this.openPanel(name);
  }

  currentPanelName() {
    return this.$panels.filter('.tab__panel--active').attr('id');
  }

  openPanel(nameOrNumber) {
    let panelName;

    if (typeof nameOrNumber === 'number') {
      panelName = this.$panels[nameOrNumber].id;
    } else {
      panelName = nameOrNumber;
    }

    const itemAndPanelToOpen = this.findItemAndPanel(panelName);
    if (!itemAndPanelToOpen) {
      /* eslint-disable no-console */
      console.log(`Nav Item or panel with name ${panelName} not found`);
      /* eslint-enable no-console */
      return undefined;
    }

    const itemAndPanelToClose = this.findItemAndPanel(this.currentPanelName());
    if (itemAndPanelToClose) {
      itemAndPanelToClose[0].removeClass('tab__nav-item--active');
      itemAndPanelToClose[1].removeClass('tab__panel--active');
    }

    itemAndPanelToOpen[0].addClass('tab__nav-item--active');
    itemAndPanelToOpen[1].addClass('tab__panel--active');

    return itemAndPanelToOpen;
  }

  findItemAndPanel(name) {
    let target = name;

    if (target == null || target.length <= 0) { return undefined; }
    if (target.indexOf('#') === 0) { target = target.slice(1); }

    const panel = this.$panels.filter(`[id=${target}]`);

    if (panel.length === 0) { return undefined; }

    const navItem = this.$navItems.filter((index, item) =>
      $(item).find(`[href='#${target}']`).length > 0);

    if (navItem.length === 0) { return undefined; }

    return [navItem, panel];
  }
}

Tab.className = 'Tab';
export default Tab;
