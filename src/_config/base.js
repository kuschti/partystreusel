import $ from 'jquery';
import Streusel from './streusel';

class Base {
  constructor(el) {
    this.$el = $(el);
    this.$el.data('object', this);
  }

  static selector() {
    const prefix = Streusel.selectorPrefix || 'streusel';
    if (Streusel.selectorType === 'css_class') {
      return `.${prefix}-${this.className.toLowerCase()}`;
    }
    return `[data-${prefix}-${this.className.toLowerCase()}]`;
  }

  /* eslint-disable no-console */
  static init(element = $('body')) {
    const selector = this.selector();
    const elementsToInit = element.find(selector).addBack(selector).filter((i, el) => !($(el).data('object') != null));
    return elementsToInit.map((i, el) => {
      console.log(`Streusel init: ${this.className}`);
      return new this(el);
    });
  }
  /* eslint-enable no-console */
}

export default Base;
