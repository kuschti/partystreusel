import Base from '../../../_config/base';

class Offcanvas extends Base {
  constructor(el) {
    super(el);
    this.toggle = this.toggle.bind(this);
    this.$el.find('.js-offcanvas__toggler').on('click', this.toggle);
    this.$el.find('.offcanvas__overlay').on('click', this.toggle);
  }

  toggle() {
    this.$el.toggleClass('offcanvas--open');
  }
}

Offcanvas.className = 'Offcanvas';
export default Offcanvas;
