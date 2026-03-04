<template>
  <div :class="[{ 'is-open': getMenuOpen }]" class="menu-bg"></div>
</template>

<script>
export default {
  name: 'MenuBg',
  props: {
    getMenuOpen: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-bg {
  position: fixed;
  top: calc(100vw * 20 / 375);
  right: calc(100vw * 20 / 375);
  bottom: 50px;
  left: 0;
  z-index: $z-menu-bg;
  pointer-events: none;
  background-color: rgba($color-white, 0.9);
  opacity: 0;
  //
  &.is-open {
    pointer-events: auto;
    opacity: 1;
  }
}
</style>
