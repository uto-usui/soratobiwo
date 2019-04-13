export default {
  getMenuOpen: state => state.menuOpen,
  getFormOpen: state => state.formOpen,
  getPageHeight: state => state.pageData.winH,
  getPageWidth: state => state.pageData.winW,
  getPageScrollY: state => state.pageData.scrollTop,
  getPageMouseX: state => (state.pageData.mouse ? state.pageData.mouse.x : 0),
  getPageMouseY: state => (state.pageData.mouse ? state.pageData.mouse.y : 0),
  // windowの半分以上スクロールしていたら false
  getIsScrollWindowHalf: (state, getters) => {
    return getters.getPageScrollY < getters.getPageHeight / 2
  },
  // window以上スクロールしていたら false
  getIsScrollWindowFull: (state, getters) => {
    return getters.getPageScrollY < getters.getPageHeight
  },
  getPageReady: state => state.pageReady,
  getIsDesktop: state => state.pageData.isDesktop,
}
