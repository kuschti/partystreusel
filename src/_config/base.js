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

  static init(element = $('body')) {
    const selector = this.selector();
    const elementsToInit = element.find(selector).addBack(selector).filter((i, el) => !($(el).data('object') != null));
    return elementsToInit.map((i, el) => new this(el));
  }
}

export default Base;
