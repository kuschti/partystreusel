import $ from 'jquery';

class ScrollTo {
  static to(x, relativeOffset = 0) {
    let position;
    let ref;

    if (typeof x === 'object' && !(x instanceof $)) {
      // expect this is a hash and link is defined
      position = $(`a[name=${JSON.stringify(x.link)}]`);
    }

    if (typeof x === 'string') {
      position = $(x);
    }
    if (typeof x !== 'number') {
      ref = x.offset();
      position = ref != null ? ref.top : undefined;
    }

    if (!(typeof x !== 'undefined' && x !== null)) { return false; }

    position = Math.round(position) + relativeOffset;
    return $('html, body').animate({ scrollTop: position }, 'slow');
  }
}

export default ScrollTo;
