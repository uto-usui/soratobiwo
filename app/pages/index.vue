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
    <!-- TODO: Add Hero component in Phase 5 -->
    <div class="placeholder-hero">
      <h1>soratobiwo</h1>
      <p>Hero component will be added in Phase 5</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-index {
  min-height: 100vh;
}

.placeholder-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: $color-white;
  text-align: center;

  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  p {
    opacity: 0.6;
  }
}
</style>
