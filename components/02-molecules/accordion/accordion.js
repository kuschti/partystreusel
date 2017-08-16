import MoveTo from 'moveto';
import Base from '../../_config/base';

class Accordion extends Base {
  constructor(el) {
    super(el);

    this.config = {
      openClass: 'accordion--open',
      titleClass: 'accordion__title',
      itemSelector: '.accordion__item',
    };

    this.items = this.$el.querySelectorAll(this.config.itemSelector);
    this.offset = this.$el.getAttribute('data-mt-tolerance');

    this.$el.addEventListener('click', this.toggleItem.bind(this));
  }

  toggleItem(e) {
    const target = e.target;
    if (target.classList.contains(this.config.titleClass)) {
      const item = e.target.closest(this.config.itemSelector);
      const currentOpen = item.classList.contains(this.config.openClass);

      for (let i = 0; i < this.items.length; i += 1) {
        this.items[i].classList.remove(this.config.openClass);
      }

      if (!currentOpen) {
        item.classList.toggle(this.config.openClass);
      }

      e.preventDefault();
      const moveTo = new MoveTo({
        tolerance: this.offset ? this.offset : 0,
      });
      moveTo.move(item);
    }
  }
}

Accordion.className = 'Accordion';
export default Accordion;
