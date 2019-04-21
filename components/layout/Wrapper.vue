<template>
  <main :class="[{ 'is-ready': getPageReady }]" class="wrapper">
    <slot />
  </main>
</template>

<script>
export default {
  name: 'Wrapper',
  props: {
    getPageReady: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: calc(100vw * 20 / 375);
  padding-right: calc(100vw * 20 / 375);
  overflow: hidden;
  //
  @include desktop {
    padding-top: calc(100vw * 30 / 1024);
    padding-right: calc(100vw * 30 / 1024);
  }
  //
  @include widescreen {
    padding-top: calc(100vw * 30 / 1280);
    padding-right: calc(100vw * 30 / 1280);
  }
}
</style>
