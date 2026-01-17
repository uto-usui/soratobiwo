import { defineStore } from 'pinia'

// Type definitions
interface Meta {
  name: string
  description: string
}

interface MousePosition {
  x: number
  y: number
}

interface PageData {
  winH: number
  winW: number
  scrollTop: number
  mouse: MousePosition | null
  isDesktop: boolean
}

interface MainState {
  meta: Meta
  pageData: PageData
  domain: string
  menuOpen: boolean
  formOpen: boolean
  postReady: boolean
  pageReady: boolean
  loaderEntered: boolean
  videoReady: boolean
  heroReady: boolean
  timerForLowPowerMode: boolean
}

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    meta: {
      name: '',
      description: '',
    },
    pageData: {
      winH: 0,
      winW: 0,
      scrollTop: 0,
      mouse: null,
      isDesktop: false,
    },
    domain: 'https://soratobiwo.com',
    menuOpen: false,
    formOpen: false,
    postReady: false,
    pageReady: false,
    loaderEntered: false,
    videoReady: false,
    heroReady: false,
    timerForLowPowerMode: false,
  }),

  getters: {
    // Menu/Form state
    getMenuOpen: (state) => state.menuOpen,
    getFormOpen: (state) => state.formOpen,

    // Page dimensions
    getPageHeight: (state) => state.pageData.winH,
    getPageWidth: (state) => state.pageData.winW,
    getPageScrollY: (state) => state.pageData.scrollTop,

    // Mouse position
    getPageMouseX: (state) => (state.pageData.mouse ? state.pageData.mouse.x : 0),
    getPageMouseY: (state) => (state.pageData.mouse ? state.pageData.mouse.y : 0),

    // Scroll state calculations
    getIsScrollWindowHalf(): boolean {
      return this.getPageScrollY < this.getPageHeight / 2
    },
    getIsScrollWindowFull(): boolean {
      return this.getPageScrollY < this.getPageHeight
    },

    // Page state
    getPageReady: (state) => state.pageReady,
    getIsDesktop: (state) => state.pageData.isDesktop,
  },

  actions: {
    // Page data
    setPageData(data: Partial<PageData>) {
      this.pageData = { ...this.pageData, ...data }
    },

    // Meta
    setMeta(data: Meta) {
      this.meta = data
    },

    // Menu
    toggleMenuOpen() {
      this.menuOpen = !this.menuOpen
    },
    setMenuOpen(value: boolean) {
      this.menuOpen = value
    },

    // Form
    setFormOpen(value: boolean) {
      this.formOpen = value
    },

    // Page ready states
    setPageReady(value: boolean) {
      this.pageReady = value
    },
    setLoaderEntered(value: boolean) {
      this.loaderEntered = value
    },
    setPostReady(value: boolean) {
      this.postReady = value
    },
    setVideoReady(value: boolean) {
      this.videoReady = value
    },
    setHeroReady(value: boolean) {
      this.heroReady = value
    },
    setTimerForLowPowerMode(value: boolean) {
      this.timerForLowPowerMode = value
    },
  },
})
