<script setup lang="ts">
interface Props {
  getPageReady?: boolean
}

withDefaults(defineProps<Props>(), {
  getPageReady: false,
})
</script>

<template>
  <main :class="[{ 'is-ready': getPageReady }]" class="wrapper">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.wrapper {
  padding-top: calc(100vw * 20 / 375);
  padding-right: calc(100vw * 20 / 375);
  overflow: hidden;

  @include desktop {
    padding-top: calc(100vw * 30 / 1024);
    padding-right: calc(100vw * 30 / 1024);
  }

  @include widescreen {
    padding-top: calc(100vw * 30 / 1280);
    padding-right: calc(100vw * 30 / 1280);
  }
}
</style>
