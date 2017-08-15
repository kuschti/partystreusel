import Base from '../../../_config/base';

class Topbar extends Base {
  constructor(el) {
    super(el);

    this.config = {
      openClass: 'topbar--open',
      openClassSublist: 'topbar__sub-list--open',
      menuButtonClass: 'topbar__mobile-menu',
      firstLvlClass: 'topbar__item',
      sublistSelector: '.topbar__sub-list',
    };

    // const menuButton = this.$el[0].querySelector('.topbar__mobile-menu');
    // const firstLvlLinks = this.$el[0].querySelectorAll('.topbar__item > .topbar__link');

    // menuButton.addEventListener('click', this.toggle.bind(this));
    this.$el[0].addEventListener('click', this.eventHandler.bind(this));
  }

  eventHandler(e) {
    if (e.target.classList.contains(this.config.menuButtonClass)) {
      this.toggleMenu(e);
    } else if (e.target.parentNode.classList.contains(this.config.firstLvlClass)) {
      this.toggleSublist(e);
    }
  }

  toggleMenu(e) {
    this.$el[0].classList.toggle(this.config.openClass);
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
