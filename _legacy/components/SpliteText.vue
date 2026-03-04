<template>
  <span
    :style="{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }"
    v-text="item"
    class="sprite-text"
  />
</template>

<script>
export default {
  name: 'SpriteText',
  components: {},
  props: {
    duration: {
      type: Number,
      default: 0,
    },
    delay: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
    item: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      //
    }
  },
  computed: {
    //
  },
}
</script>

<style lang="scss" scoped>
.sprite-text {
  display: inline-block;
  backface-visibility: hidden;
}
</style>
