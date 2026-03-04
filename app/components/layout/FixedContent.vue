<script setup lang="ts">
interface Props {
  getPageHeight?: number
  getPageScrollY?: number
  getMenuOpen?: boolean
  getIsDesktop?: boolean
}

withDefaults(defineProps<Props>(), {
  getPageHeight: 0,
  getPageScrollY: 0,
  getMenuOpen: false,
  getIsDesktop: false,
})

const route = useRoute()
</script>

<template>
  <div :class="[{ 'is-open': getMenuOpen }]" class="fixed-content">
    <LayoutLogo />
    <LayoutFrame />
    <LayoutContact />
    <LayoutCopy />
    <LayoutNews :get-is-desktop="getIsDesktop" :get-menu-open="getMenuOpen" />

    <LayoutHeader
      v-if="false"
      :get-menu-open="getMenuOpen"
      :get-page-height="getPageHeight"
      :get-page-scroll-y="getPageScrollY"
    />
    <LayoutMenu :get-is-desktop="getIsDesktop" :get-menu-open="getMenuOpen" />
    <LayoutMenuDesktop v-if="route.fullPath !== '/' && getIsDesktop" />
    <LayoutMenuBg :get-menu-open="getMenuOpen" />
    <LayoutMenuTrigger v-if="route.fullPath !== '/' && !getIsDesktop" />
    <LayoutFooter v-if="false" />
  </div>
</template>

<style lang="scss" scoped>
.fixed-content {
  //
}
</style>
