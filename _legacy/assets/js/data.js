import { debounce } from 'throttle-debounce'

/**
 * ページデータ
 * @type {{spW: number, tabW: number, pcW: number, wideScreenW: number, fullHdW: number, scrollTop: number, scrollLeft: number, init(): void, transitionEnd: string, animationEnd: string}}
 */
const DATA = {
  domain: '',
  spW: 320,
  tabW: 768,
  pcW: 1024,
  wideScreenW: 1200,
  fullHdW: 1600,
  scrollTop: 0,
  scrollLeft: 0,

  init() {
    const self = this
    self.winH = window.innerHeight
    self.pageH = document.documentElement.scrollHeight

    self.isMini = self.winW < self.spW
    self.isSp = self.spW <= self.winW && self.winW <= self.tabW
    self.isTab = self.tabW <= self.winW && self.winW <= self.pcW
    self.isPc = self.winW >= self.pcW && self.winW <= self.wideScreenW
    self.isWidescreen =
      self.winW >= self.wideScreenW && self.winW <= self.fullHdW
    self.isFullHd = self.winW >= self.fullHdW

    self.isDesktop = self.winW >= self.pcW
    self.isMobile = self.winW <= self.pcW

    const resize = () => {
      self.winW = window.innerWidth
      self.winH = window.innerHeight
      self.pageH = document.documentElement.scrollHeight

      self.isMini = self.winW <= self.spW
      self.isSp = self.spW <= self.winW && self.winW <= self.tabW
      self.isTab = self.tabW <= self.winW && self.winW <= self.pcW
      self.isPc = self.winW >= self.pcW && self.winW <= self.wideScreenW
      self.isWidescreen =
        self.winW >= self.wideScreenW && self.winW <= self.fullHdW
      self.isFullHd = self.winW >= self.fullHdW

      self.isDesktop = self.winW >= self.pcW
      self.isMobile = self.winW <= self.pcW
    }
    resize()

    window.addEventListener(
      'resize',
      debounce(30 / 1000, () => {
        resize()
      }),
      false,
    )

    const scroll = () => {
      self.scrollTop = window.pageYOffset
    }
    window.addEventListener(
      'scroll',
      debounce(30 / 1000, () => {
        scroll()
      }),
      false,
    )

    self.mouse = {
      x: 0,
      y: 0,
    }
    const getMousePosition = e => {
      self.mouse.x = e.clientX
      self.mouse.y = e.clientY
    }
    window.addEventListener('mousemove', getMousePosition)

    //    window.addEventListener('scroll', throttle(60, () => {
    //      scroll();
    //    }), false)
  },
  transitionEnd:
    'oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend',
  animationEnd: 'webkitAnimationEnd oanimationend msAnimationEnd animationend',
}

export default DATA
