import $ from 'jquery';
import Base from '../../../_config/base';

class Dropdown extends Base {
  constructor(el) {
    super(el);
    this.openClass = 'dropdown--open';
    this.activeClass = 'btn--active';
    this.toggler = '.js-dropdown__toggler';
    this.actions = '.js-dropdown__actions a';

    this.$el.on('click', this.toggler, this.toggleDropdown.bind(this));
    this.$el.on('click', this.actions, this.toggleDropdown.bind(this));
  }

  toggleDropdown() {
    $(this.toggler).toggleClass(this.activeClass);
    return this.$el.toggleClass(this.openClass);
  }
}

Dropdown.className = 'Dropdown';
export default Dropdown;
