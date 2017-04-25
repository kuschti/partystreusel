import $ from 'jquery';
import Base from '../../../_config/base';

class Topbar extends Base {
  constructor(el) {
    super(el);
    this.toggleClass = 'topbar__sub-list--open';
    this.$el.find('.topbar__mobile-menu').on('click', this.toggle.bind(this));
    this.$el.on('click', '.topbar__item > .topbar__link', this.toggleItem.bind(this));
  }

  toggle() {
    this.$el.toggleClass('topbar--open');
  }

  toggleItem(e) {
    const item = $(e.target).closest('.topbar__item');
    const subList = item.find('.topbar__sub-list');
    if (subList.length === 0) { return; }

    subList.toggleClass(this.toggleClass);
    e.preventDefault();
  }
}

Topbar.className = 'Topbar';
export default Topbar;
