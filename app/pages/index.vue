<script setup lang="ts">
import { useMainStore } from '~/stores/main'

const store = useMainStore()

// SEO
usePageSeo()

// Page loading transition
usePageLoading()
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
