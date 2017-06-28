import Base from '../../../_config/base';

class Dropdown extends Base {
  constructor(el) {
    super(el);

    this.config = {
      openClass: 'dropdown--open',
      btnActiveClass: 'btn--active',
      togglerSelector: '.js-dropdown__toggler',
    };

    this.button = this.$el[0].querySelector(this.config.togglerSelector);

    this.$el[0].addEventListener('click', this.triggerToggle.bind(this));
  }

  triggerToggle() {
    this.$el[0].classList.toggle(this.config.openClass);
    this.button.classList.toggle(this.config.btnActiveClass);
  }
}

Dropdown.className = 'Dropdown';
export default Dropdown;
