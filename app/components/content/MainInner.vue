<script setup lang="ts">
// MainInner - inner content wrapper with dark background
</script>

<template>
  <div class="main-inner">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.main-inner {
  padding: calc(100vw * 30 / 375);
  background-color: $color-gray-level1;

  @include desktop {
    padding: calc(100vw * 30 / 1024);
  }
}
</style>
