<template>
  <div :class="[{'is-ready': getPageReady}]" class="wrapper">
    <slot />
  </div>
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
  //
}
</style>
