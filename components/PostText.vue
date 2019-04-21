<template>
  <p class="post-text" v-html="text" />
</template>

<script>
export default {
  name: 'PostText',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.post-text {
  position: relative;
  max-width: 550px;
  font-size: 1.2rem;
  line-height: 1.95;
  //
  + .post-text {
    margin-top: 2em;
  }
  //
  @include desktop {
    font-size: 1.4rem;
    line-height: 2.25;
  }
  //
  @include fullhd {
    font-size: 1.6rem;
    line-height: 2.5;
  }
}
</style>
