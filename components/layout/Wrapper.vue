<template>
  <div :class="[{'is-ready': getHeroReady}]" class="wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: {
    getHeroReady: {
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
