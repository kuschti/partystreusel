import Base from '../../../base';
import $ from 'jquery';

class Topbar extends Base {
  constructor(el) {
    super(el);
    this.toggle = this.toggle.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.$el.find('.topbar__mobile-menu').on('click', this.toggle);
    this.$el.find('.topbar__item').on('click', this.toggleItem);
  }

  toggle(e) {
    return this.$el.toggleClass('topbar--open');
  }

  toggleItem(e) {
    var item = $(e.target).closest('.topbar__item');
    var subList = item.find('.topbar__sub-list');
    if (subList.length === 0) { return; }

    subList.toggleClass('topbar__sub-list--open');
    return e.preventDefault();
  }
}

Topbar.className = 'Topbar';
export default Topbar;
