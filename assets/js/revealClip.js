import { TweenMax, TimelineMax, Expo } from 'gsap'
import { debounce } from 'throttle-debounce'

class RevealClip {
  /**
   * Constructor
   *
   * @param target {Element} target element
   * @param direction {String} animation direction
   * @param speed
   * @param delay
   */
  constructor(target, direction, speed = 1, delay = 0, resizeDisable = false) {
    this.target = target
    this.direction = direction
    this.speed = speed
    this.resizeDisable = resizeDisable

    this.height = 0
    this.width = 0

    this.finished = false

    this._init()
    this.resizeDisable || this._resize()
  }

  /**
   * initialize
   * @private
   */
  _init() {
    this._setWrapperPosition()
    this._getSize()
    this._createHtml()
    this._setInitClipStyle()
  }

  /**
   * destroy instance
   */
  destroy() {
    this.target = null
    this.direction = null
    this.finished = false
    this.speed = 0
    this.height = 0
    this.width = 0
  }

  /**
   * set resize function
   * @private
   */
  _resize() {
    const cb = () => this._onResizeFunc()
    window.addEventListener('resize', debounce(180, cb))
  }

  /**
   * resize function
   * @private
   */
  _onResizeFunc() {
    //    console.log('from reveal clip / resize start !!!!!')

    //    console.log('this.target', this.target)

    this._resetSize()
    this._setInitClipStyle()

    if (this.finished) {
      this._setClipStyle()
    } else {
      this._setInitClipStyle()
    }

    //    console.log('from reveal clip / resize end !!!!!')
  }

  /**
   * set original size
   * @private
   */
  _resetSize() {
    this.target.style.height = ''
    this.target.style.width = ''

    //    console.log('reset !!!! this.target.style.width', this.target.style.width)
    //

    this._getSize()
  }

  /**
   * set original size
   * @private
   */
  _getSize() {
    this.height = this.target.clientHeight
    this.width = this.target.clientWidth

    //    console.log('this.target.clientWidth', this.target, this.target.clientWidth)

    this._setSize()

    //    console.log('this.width', this.width)
  }

  /**
   * set wrapper size
   * @private
   */
  _setSize() {
    this.target.style.height = this.height + 'px'
    this.target.style.width = this.width + 'px'

    //    console.log('this.target.style.width', this.target.style.width)
  }

  /**
   * set position on wrapper element
   * @private
   */
  _setWrapperPosition() {
    /**
     * get position prop
     * @type {string}
     */
    const position = window.getComputedStyle(this.target).position

    /**
     * set position prop
     */
    if (
      position !== 'fixed' &&
      position !== 'absolute' &&
      position !== 'relative'
    ) {
      this.target.style.position = 'relative'
    }
  }

  /**
   * initialize clip style
   */
  _setInitClipStyle() {
    TweenMax.set(this.target.firstElementChild, {
      clip: this._getInitRect(),
      force3D: true,
      rotation: 0.01,
    })

    //    console.log('_setInitClipStyle')
  }

  /**
   * goal clip style
   */
  _setClipStyle() {
    TweenMax.set(this.target.firstElementChild, {
      clip: this._getRect(),
      force3D: true,
      rotation: 0.01,
    })

    //    console.log('_setClipStyle')
  }

  /**
   * create inner div
   * @type {string}
   */
  _createHtml() {
    this.target.innerHTML = `
<div class="reveal-clip" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 9;">
  ${this.target.innerHTML}
</div>
`
  }

  /**
   * initialize rect position
   * @returns {string}
   */
  _getInitRect() {
    if (this.direction === 'lr') {
      return `rect(0px 0px ${this.height}px 0px)`
    } else if (this.direction === 'rl') {
      return `rect(0px ${this.width}px ${this.height}px ${this.width}px)`
    } else if (this.direction === 'tb') {
      return `rect(0px ${this.width}px 0px 0px)`
    } else if (this.direction === 'bt') {
      return `rect(${this.height}px ${this.width}px ${this.height}px 0px)`
    }
  }

  /**
   * get rect animation position
   * @returns {string}
   */
  _getRect() {
    let rect = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }

    if (this.direction === 'lr') {
      rect.bottom = this.height
      rect.right = this.width
    } else if (this.direction === 'rl') {
      rect.bottom = this.height
      rect.right = this.width
    } else if (this.direction === 'tb') {
      rect.right = this.width
      rect.bottom = this.height
    } else if (this.direction === 'bt') {
      rect.right = this.width
      rect.bottom = this.height
    }

    return `rect(${rect.top}px ${rect.right}px ${rect.bottom}px ${rect.left}px)`
  }

  /**
   * animation start to
   */
  animTo() {
    return new Promise(resolve => {
      TweenMax.to(this.target.firstElementChild, this.speed, {
        clip: this._getRect(),
        ease: Expo.easeInOut,
        onComplete: () => {
          this.finished = true
          resolve()
        },
      })
    })
  }

  /**
   * animation start from
   */
  animFrom() {
    return new Promise(resolve => {
      TweenMax.to(this.target.firstElementChild, this.speed, {
        clip: this._getInitRect(),
        ease: Expo.easeInOut,
        onComplete: () => {
          this.finished = false
          resolve()
        },
      })
    })
  }

  /**
   * animation start from to
   */
  animFromTo() {
    return new Promise(resolve => {
      const tl = new TimelineMax({
        onComplete: () => {
          this.finished = true
          resolve()
        },
      })

      tl.to(this.target.firstElementChild, this.speed, {
        clip: this._getInitRect(),
        ease: Expo.easeInOut,
      }).to(this.target.firstElementChild, this.speed, {
        clip: this._getRect(),
        ease: Expo.easeInOut,
      })
    })
  }
}

export default RevealClip
