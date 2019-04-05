export default ({ app, store }) => {
  app.router.afterEach((to, from) => {
    store.dispatch('setPageName', to.name)
  })
}
