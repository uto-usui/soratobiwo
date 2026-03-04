export default {
  pageData(state, data) {
    state.pageData = data
  },
  setMeta(state, data) {
    state.meta = data
  },
  menuOpen(state, data) {
    state.menuOpen = data
  },
  formOpen(state, data) {
    state.formOpen = data
  },
  pageReady(state, data) {
    state.pageReady = data
  },
}
