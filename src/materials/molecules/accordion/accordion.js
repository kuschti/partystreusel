import $ from 'jquery';
import Base from '../../../base';
import ScrollTo from '../../../materials/molecules/scroll_to/scrollTo';

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

    this.items.filter(this.openClass).each((_, i) => {
      this.trigger('close', $(i));
    });

    this.items.removeClass(this.openClass);
    if (!currentOpen) {
      item.toggleClass(this.openClass);
      this.trigger('open', item);
    }

    e.preventDefault();
    return ScrollTo.to(item, this.offset);
  }
}

Accordion.className = 'Accordion';
export default Accordion;
