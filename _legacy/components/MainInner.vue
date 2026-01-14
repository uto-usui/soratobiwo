<template>
  <div class="main-inner">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MainInner',
  props: {
    //
  },
}
</script>

<style lang="scss" scoped>
.main-inner {
  padding: calc(100vw * 30 / 375);
  background-color: $color-gray-level1;
  //
  @include desktop {
    padding: calc(100vw * 30 / 1024);
  }
}
</style>
