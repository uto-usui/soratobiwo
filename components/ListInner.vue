<template>
  <nuxt-link
    v-if="isLink"
    :to="`/${$store.state.route.name}/${slug}/`"
    class="list-inner"
  >
    <slot />
  </nuxt-link>
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
    slug: {
      type: String,
      default: '',
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
