<script setup lang="ts">
// MainOuter - main content wrapper
</script>

<template>
  <article class="main-outer">
    <slot />
  </article>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.main-outer {
  padding-bottom: calc(50px + 35px);

  @include desktop {
    width: calc(100vw / 3 * 2);
    padding-bottom: calc(100vw * 30 / 1280 + 5px);
  }
}
</style>
