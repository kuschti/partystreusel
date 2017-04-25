import $ from 'jquery';
import Base from '../../../_config/base';
import ScrollTo from '../../../materials/molecules/scroll-to/scroll-to';

class Accordion extends Base {
  constructor(el) {
    super(el);
    this.openClass = 'accordion--open';
    this.items = this.$el.find('.accordion__item');
    this.offset = this.$el.data('scroll-offset');
    this.$el.find('.accordion__title').on('click', this.toggleItem.bind(this));
  }

  toggleItem(e) {
    const item = $(e.target).closest('.accordion__item');
    const currentOpen = item.hasClass(this.openClass);

    this.items.removeClass(this.openClass);
    if (!currentOpen) {
      item.toggleClass(this.openClass);
    }

    e.preventDefault();
    return ScrollTo.to(item, this.offset);
  }
}

Accordion.className = 'Accordion';
export default Accordion;
