import Base from '../../../base';

class Offcanvas extends Base {
  constructor(el) {
    super(el);
    this.toggle = this.toggle.bind(this);
    this.$el.find('.js-offcanvas__toggler').on('click', this.toggle);
    this.$el.find('.offcanvas__overlay').on('click', this.toggle);
  }

  toggle() {
    this.$el.toggleClass('offcanvas--open');
    if (this.$el.hasClass('offcanvas--open')) {
      return this.trigger('open', this.$el);
    }
    return this.trigger('close', this.$el);
  }
}

Offcanvas.className = 'Offcanvas';
export default Offcanvas;
