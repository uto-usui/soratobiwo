<template>
  <article class="main-outer">
    <slot />
  </article>
</template>

<script>
export default {
  name: 'MainOuter',
  props: {
    //
  },
}
</script>

<style lang="scss" scoped>
.main-outer {
  padding-bottom: calc(50px + 35px);
  //
  @include desktop {
    width: calc(100vw / 3 * 2);
    padding-bottom: calc(100vw * 30 / 1280 + 5px);
  }
}
</style>
