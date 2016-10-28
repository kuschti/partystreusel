class Base {
  static selector() {
    var prefix = Partystreusel.selectorPrefix || 'streusel';
    if (Streusel.selectorType === 'css_class') {
      return `.${prefix}-${this.className.toLowerCase()}`;
    } else {
      return `[data-${prefix}-${this.className.toLowerCase()}]`;
    }
  }

  static init(element = $('body')) {
    // OLD CODE
    // return element.find(this.selector()).addBack(this.selector()).filter(function(i, el) {
    //   return !(($(el).data('object') != null)).map((i, el) => new this(el));
    // });

    element.find(this.selector()).addBack(this.selector()).filter(function(i, el) {
      return !($(el).data('object') != null);
    }).map((function(_this) {
      return function(i, el) {
        console.log('Partystreusel init: ' + _this.className);
        return new _this(el);
      };
    })(this));
  }

  constructor(el) {
    this.$el = $(el);
    this.$el.data('object', this);
  }

  trigger(name) {
    arguments[0] = `${this.constructor.className.toLowerCase()}-${name}`;
    return this.$el.trigger.apply(this.$el, arguments);
  }
}

Base.className = 'Base';
