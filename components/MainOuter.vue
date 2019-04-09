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
  width: calc(100vw / 3 * 2);
}
</style>
