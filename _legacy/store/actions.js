export default {
  setPageData({ commit }, value) {
    commit('pageData', value)
  },
  toggleMenuOpen({ commit, state }) {
    let isOpen = state.menuOpen
    isOpen = !isOpen
    commit('menuOpen', isOpen)
  },
  /**
   * @param value {boolean}
   */
  setMenuOpen({ commit }, value) {
    commit('menuOpen', value)
  },
  setFormOpen({ commit }, value) {
    console.log('formOpen', value)
    commit('formOpen', value)
  },
  setPageReady({ commit }, value) {
    commit('pageReady', value)
  },
}
