import { throttle } from 'throttle-debounce'

/**
 *
 */
class showElements {
  /**
   *
   * @param targets
   * @param option
   * @param callbackIn
   * @returns {showElements}
   */
  constructor(targets, option = {}, callbackIn) {
    this.targets = targets
    this.container = option.container || window
    this.windowH = window.innerHeight
    this.scrollY = 0
    this.offsetTop = []
    this.height = []
    this.show = []
    this.value = []

    /**
     * 要素が見え始めるオフセット
     * @type {*|number}
     */
    this.offset = option.offset || 150

    /**
     * 要素を通り過ぎたときに非表示にする
     * @type {boolean}
     */
    this.backDisable = option.back === false

    /**
     * 見えた時のコールバック関数
     * @type {Function}
     */
    this.callbackIn = typeof callbackIn === 'function' ? callbackIn : () => {}

    this.getItem()
    this.init()

    return this
  }

  init() {
    this.container.addEventListener(
      'scroll',
      throttle(100, () => {
        this.scrollY = this.container.scrollTop
        this.check()
      }),
      false,
    )

    this.check()
  }

  getItem() {
    this.targets.forEach((el, i) => {
      const rect = el.getBoundingClientRect()

      this.offsetTop[i] = rect.top
      this.height[i] = el.offsetHeight
    })
  }

  check() {
    this.targets.forEach((el, i) => {
      /**
       * scroll + window > element position + user offset
       * @type {boolean}
       */
      const show = (this.show[i] =
        this.scrollY + this.windowH > this.offsetTop[i] + this.offset)

      if (this.backDisable) {
        this.show[i] = show
      } else {
        this.show[i] =
          show &&
          this.scrollY < this.offsetTop[i] - this.offset + this.height[i]
      }

      this.value[i] = show

      if (this.show[i]) {
        el.classList.add('is-show')
        this.callbackIn.call(this, el, i)
      } else {
        // 再度スクロールちが小さくなるとクラスを外す
        // el.classList.remove('is-show')
      }
    })
  }
}
export default showElements
