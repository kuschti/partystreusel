import Base from '../../../base';

class Dropdown extends Base {
  constructor(el) {
    super(el);
    this.parent = this.$el.closest('.dropdown');
    this.$el.on('click', this.toggleDropdown.bind(this));
  }

  toggleDropdown() {
    return this.parent.toggleClass('dropdown--open');
  }
}

Dropdown.className = 'Dropdown__Toggler';
export default Dropdown;
