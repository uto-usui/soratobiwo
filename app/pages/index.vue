<script setup lang="ts">
import { useMainStore } from '~/stores/main'

const store = useMainStore()

// SEO
usePageSeo()

// Set page ready after mount
onMounted(async () => {
  await nextTick()
  // Small delay to allow animations
  setTimeout(() => {
    store.setPageReady(true)
  }, 100)
})

// Reset page ready on unmount
onBeforeUnmount(() => {
  store.setPageReady(false)
})
</script>

<template>
  <div class="page-index">
    <ContentHero
      :get-page-ready="store.pageReady"
      :get-page-height="store.getPageHeight"
    />
  </div>
</template>

<style lang="scss" scoped>
.page-index {
  min-height: 100vh;
}
</style>
