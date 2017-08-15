import Base from '../../../_config/base';

class Topbar extends Base {
  constructor(el) {
    super(el);
    console.log('topbar');

    this.config = {
      openClass: 'topbar--open',
      openClassSublist: 'topbar__sub-list--open',
      menuButtonClass: 'topbar__mobile-menu',
      firstLvlClass: 'topbar__item',
      sublistSelector: '.topbar__sub-list',
    };
    this.$el.addEventListener('click', this.eventHandler.bind(this));
  }

  eventHandler(e) {
    if (e.target.classList.contains(this.config.menuButtonClass)) {
      this.toggleMenu(e);
    } else if (e.target.parentNode.classList.contains(this.config.firstLvlClass)) {
      this.toggleSublist(e);
    }
  }

  toggleMenu(e) {
    this.$el.classList.toggle(this.config.openClass);
    e.preventDefault();
  }

  toggleSublist(e) {
    const subList = e.target.parentNode.querySelector(this.config.sublistSelector);
    if (subList.length === 0) { return; }

    subList.classList.toggle(this.config.openClassSublist);
    e.preventDefault();
  }
}

Topbar.className = 'Topbar';
export default Topbar;
