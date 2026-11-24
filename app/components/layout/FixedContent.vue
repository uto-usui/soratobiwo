<script setup lang="ts">
interface Props {
  getPageHeight?: number
  getPageScrollY?: number
  getMenuOpen?: boolean
}

withDefaults(defineProps<Props>(), {
  getPageHeight: 0,
  getPageScrollY: 0,
  getMenuOpen: false,
})

const route = useRoute()
</script>

<template>
  <div :class="[{ 'is-open': getMenuOpen }]" class="fixed-content">
    <LayoutLogo />
    <LayoutFrame />
    <LayoutContact />
    <LayoutCopy />
    <LayoutNews :get-menu-open="getMenuOpen" />

    <LayoutHeader
      v-if="false"
      :get-menu-open="getMenuOpen"
      :get-page-height="getPageHeight"
      :get-page-scroll-y="getPageScrollY"
    />
    <LayoutMenu :get-menu-open="getMenuOpen" />
    <!-- PC とスマホの出し分けは各コンポーネントの CSS でする。JS で画面幅を見ると、最初の HTML がスマホ表示になる -->
    <LayoutMenuDesktop v-if="route.fullPath !== '/'" />
    <LayoutMenuBg :get-menu-open="getMenuOpen" />
    <LayoutMenuTrigger v-if="route.fullPath !== '/'" />
    <LayoutFooter v-if="false" />
  </div>
</template>

<style lang="scss" scoped>
.fixed-content {
  //
}
</style>
