<template>
  <div class="hero">
    <div
      v-lazy:background-image="require('Images/hero/item2.jpg')"
      class="hero__main"
    />
  </div>
</template>

<script>
export default {
  name: 'Hero',
  components: {},
  props: {
    getPageReady: {
      type: Boolean,
      default: false,
    },
    getPageHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      height: '',
    }
  },
  computed: {
    //
  },
  created() {
    //
  },
  mounted() {
    this.$nextTick(() => {
      //
    })
  },
  methods: {
    //
  },
}
</script>

<style lang="scss" scoped>
.hero {
  //
}

.hero__main {
  position: fixed;
  top: calc(100vw * 20 / 375);
  left: 0;
  width: calc(100vw * 300 / 375);
  height: calc(100vh * 200 / 667);
  //
  @include bg-cover;
  //
  @include desktop {
    top: calc(100vw * 30 / 1024);
    width: calc(100vw - 100vw * 30 / 1024);
    height: calc(100vh * 482 / 768);
  }
  //
  &::after {
    //
    @include touch {
      position: absolute;
      top: 100%;
      right: 0;
      left: 0;
      height: calc(100vw * 20 / 375);
      content: '';
      background-color: $color-gray-level2;
    }
  }
}
</style>
