<script setup lang="ts">
interface Props {
  getMenuOpen?: boolean
}

withDefaults(defineProps<Props>(), {
  getMenuOpen: false,
})
</script>

<template>
  <div :class="[{ 'is-open': getMenuOpen }]" class="menu-bg" />
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

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

  &.is-open {
    pointer-events: auto;
    opacity: 1;
  }
}
</style>
