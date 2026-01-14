<template>
  <div v-if="image" class="post-image">
    <lazyImage :src="require(`Images/${image}`)" :alt="`artist image`" />
  </div>
</template>

<script>
import lazyImage from '~/components/utility/LazyImage'

export default {
  name: 'PostImage',
  components: { lazyImage },
  props: {
    image: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
.post-image {
  margin-right: calc(100vw * 30 / 375 * -1);
  margin-bottom: 20px;
  margin-left: calc(100vw * 30 / 375 * -1);
  //
  @include desktop {
    margin-right: calc(100vw * 30 / 1024 * -1);
    margin-bottom: calc(100vw * 35 / 1024);
    margin-left: calc(100vw * 30 / 1024 * -1 + 100vw * 90 / 1024 * -1);
  }
}
</style>
