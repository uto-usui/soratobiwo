import { TweenLite, Sine, Power1 } from 'gsap'

import _event from './eventManager'

/**
 * Effect tilting the element to make it look like 3D
 * 要素を傾けて３Dのように見せるエフェクト
 */
class skewElement {
  /**
   * @param wrapper {Object} id element
   * @param target  {Object} some elements
   */
  constructor(wrapper, target) {
    this.app = wrapper
    this.target = target
    this._eventList = []
  }

  init() {
    if (!this.app) return

    const handleMouseMove = e => this.mouseMoveFn(e)
    const handleMouseLeave = e => this.mouseLeaveFn(e)

    this._eventList.push(new _event(this.app, 'mousemove', handleMouseMove))
    this._eventList.push(new _event(this.app, 'mouseleave', handleMouseLeave))
  }

  destroy() {
    this._eventList.forEach(event => event.destroy())
  }

  mouseMoveFn(e) {
    const xMouse =
      e.pageX -
      e.currentTarget.getBoundingClientRect().left -
      e.currentTarget.offsetWidth / 2

    const yMouse =
      e.pageY -
      window.pageYOffset -
      e.currentTarget.getBoundingClientRect().top -
      e.currentTarget.offsetHeight / 2

    const mouseElements = [...e.currentTarget.querySelectorAll(this.target)]

    mouseElements.forEach(el => {
      const factor = el.dataset.mouseParallax

      const xFinal = xMouse * factor * 0.1 * -1

      const yFinal = yMouse * factor * 0.1 * -1

      TweenLite.to(el, 0.4, {
        x: xFinal,
        y: yFinal,
        skewX: xFinal * 0.01,
        skewY: xFinal * 0.01,
        ease: Power1.easeOut,
      })
    })
  }

  mouseLeaveFn(e) {
    const mouseElements = [...e.currentTarget.querySelectorAll(this.target)]

    mouseElements.forEach(el => {
      TweenLite.to(el, 0.4, {
        x: 0,
        y: 0,
        skewX: 0,
        skewY: 0,
        ease: Sine.easeOut,
      })
    })
  }
}

export default skewElement
