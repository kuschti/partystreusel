import $ from 'jquery';
import Base from '../../../base';

class Topbar extends Base {
  constructor(el) {
    super(el);
    this.el = $(el);
    $(el).find('.topbar__mobile-menu').on('click', this.toggle.bind(this));
    $(el).find('.topbar__item').on('click', this.toggleItem);
  }

  toggle() {
    this.el.toggleClass('topbar--open');
  }

  static toggleItem(e) {
    const item = $(e.target).closest('.topbar__item');
    const subList = item.find('.topbar__sub-list');
    if (subList.length === 0) { return; }

    subList.toggleClass('topbar__sub-list--open');
    e.preventDefault();
  }
}

Topbar.className = 'Topbar';
export default Topbar;
