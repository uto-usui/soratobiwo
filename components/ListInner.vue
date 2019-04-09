<template>
  <a v-if="isLink" class="list-inner">
    <slot />
  </a>
  <div v-else class="list-inner">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ListInner',
  props: {
    isLink: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.list-inner {
  display: block;
  color: inherit;
  //
  @include touch {
    padding: calc(100vw * 25 / 375) calc(100vw * 25 / 375)
      calc(100vw * 25 / 375);
  }
}
</style>
