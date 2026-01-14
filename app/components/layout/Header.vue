<script setup lang="ts">
// Header component
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
</script>

<template>
  <header :class="[{ 'is-open': getMenuOpen }]" class="header">
    header
  </header>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: $z-header;
  color: $color-blue;

  @include desktop {
    transition: color 0.25s $easeInOutSine;

    &.is-open {
      color: $color-blue;
      transition: color 0.75s 0.25s $easeInOutSine;
    }

    &.is-comic {
      color: $color-blue;
    }
  }
}
</style>
