<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import { storeToRefs } from 'pinia'

const store = useMainStore()
const { pageReady, menuOpen, pageData } = storeToRefs(store)

// Initialize page data on mount (client-side only)
onMounted(() => {
  nextTick(() => {
    initPageData()
  })
})

function initPageData() {
  const winW = window.innerWidth
  const winH = window.innerHeight
  const scrollTop = window.pageYOffset
  const isDesktop = winW >= 1024

  store.setPageData({
    winW,
    winH,
    scrollTop,
    isDesktop,
    mouse: { x: 0, y: 0 },
  })

  // Resize listener
  const handleResize = () => {
    const winW = window.innerWidth
    const winH = window.innerHeight
    const isDesktop = winW >= 1024
    store.setPageData({ winW, winH, isDesktop })
  }

  // Scroll listener
  const handleScroll = () => {
    store.setPageData({ scrollTop: window.pageYOffset })
  }

  // Mouse move listener
  const handleMouseMove = (e: MouseEvent) => {
    store.setPageData({ mouse: { x: e.clientX, y: e.clientY } })
  }

  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('mousemove', handleMouseMove)

  // Cleanup on unmount
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('mousemove', handleMouseMove)
  })
}
</script>

<template>
  <div
    :class="[{ 'is-ready': pageReady }]"
    class="body"
  >
    <ContentLoader :get-page-ready="pageReady" />
    <LayoutFixedContent
      :get-page-height="pageData.winH"
      :get-page-scroll-y="pageData.scrollTop"
      :get-menu-open="menuOpen"
      :get-is-desktop="pageData.isDesktop"
    />
    <slot />
    <LayoutFormContent />
  </div>
</template>

<style lang="scss" scoped>
.body {
  min-height: 100vh;
  background-color: $color-primary;
}
</style>

<style lang="scss">
@font-face {
  font-family: 'MyYuGothicM';
  font-weight: normal;
  src: local('YuGothic-Medium'), local('Yu Gothic Medium'),
    local('YuGothic-Regular');
}

@font-face {
  font-family: 'MyYuGothicM';
  font-weight: bold;
  src: local('YuGothic-Bold'), local('Yu Gothic');
}
</style>
