import { defineStore } from 'pinia'

interface MainState {
  menuOpen: boolean
  formOpen: boolean
  pageReady: boolean
  loaderEntered: boolean
}

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    menuOpen: false,
    formOpen: false,
    // 初回は書き出した HTML をそのまま見せる。ページ移動のときだけ usePageLoading が false に戻してローダーを出す
    pageReady: true,
    loaderEntered: false,
  }),

  actions: {
    toggleMenuOpen() {
      this.menuOpen = !this.menuOpen
    },
    setMenuOpen(value: boolean) {
      this.menuOpen = value
    },
    setFormOpen(value: boolean) {
      this.formOpen = value
    },
    setPageReady(value: boolean) {
      this.pageReady = value
    },
    setLoaderEntered(value: boolean) {
      this.loaderEntered = value
    },
  },
})
