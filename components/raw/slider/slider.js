import Flickity from 'flickity';
import Base from '../../_config/base';

class Slider extends Base {
  constructor(el) {
    super(el);
    this.slideItems = document.querySelector('.slider__items');
    this.initializeSlider();
  }

  initializeSlider() {
    /* eslint-disable no-unused-vars */
    const flkty = new Flickity(this.slideItems, {
      setGallerySize: false,
      lazyLoad: true,
      arrowShape: 'M19.1,45.1c-1.4,1.4-1.8,2.7-1.8,4.6s0.5,3.2,1.8,4.6l41.5,41.5c2.7,2.7,6.4,2.7,9.1,0c2.7-2.7,2.7-6.4,0-9.1L32.8,49.7 l36.9-36.9c2.7-2.7,2.7-6.4,0-9.1c-1.4-1.4-3.2-1.8-4.6-1.8c-1.8,0-3.2,0.5-4.6,1.8L19.1,45.1z',
    });
    /* eslint-enable no-unused-vars */
  }
}

Slider.className = 'Slider';
export default Slider;
