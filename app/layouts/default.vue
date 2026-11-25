<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import { storeToRefs } from 'pinia'

const store = useMainStore()
const { pageReady, menuOpen } = storeToRefs(store)
</script>

<template>
  <div :class="[{ 'is-ready': pageReady }]" class="body">
    <ContentLoader :get-page-ready="pageReady" />
    <LayoutFixedContent :get-menu-open="menuOpen" />
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
  src: local('YuGothic-Medium'), local('Yu Gothic Medium'), local('YuGothic-Regular');
}

@font-face {
  font-family: 'MyYuGothicM';
  font-weight: bold;
  src: local('YuGothic-Bold'), local('Yu Gothic');
}
</style>
