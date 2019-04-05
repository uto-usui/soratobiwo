export default () => {
  return {
    meta: {
      name: '',
      description: '',
    },
    pageData: {},
    domain: 'https://wired.j/wellbeing',
    menuOpen: false,

    postReady: false, // 0
    pageReady: false, // 1
    videoReady: false, // 2
    heroReady: false, // 3 - play video!!
    timerForLowPowerMode: false, // x - Force page forward
    pageName: 'index',
  }
}
