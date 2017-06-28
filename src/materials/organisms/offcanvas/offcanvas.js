import Base from '../../../_config/base';

class Offcanvas extends Base {
  constructor(el) {
    super(el);

    this.config = {
      openClass: 'offcanvas--open',
      overlaySelector: '.offcanvas__overlay',
      openButtonSelector: '.offcanvas__opener',
      closeButtonSelector: '.offcanvas__close',
    };

    const togglerOpen = this.$el[0].querySelector(this.config.openButtonSelector);
    const togglerClose = this.$el[0].querySelector(this.config.closeButtonSelector);
    const overlay = this.$el[0].querySelector(this.config.overlaySelector);

    togglerOpen.addEventListener('click', this.toggle.bind(this));
    togglerClose.addEventListener('click', this.toggle.bind(this));
    overlay.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    this.$el[0].classList.toggle(this.config.openClass);
  }
}

Offcanvas.className = 'Offcanvas';
export default Offcanvas;
