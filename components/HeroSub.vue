<template>
  <div class="sub-hero">
    <h1 v-if="title" class="sub-hero__title" v-html="title" />
    <figure v-lazy:background-image="image" class="sub-hero__figure" />
    <div class="sub-hero__bg" />
  </div>
</template>

<script>
export default {
  name: 'HeroSub',
  components: {},
  props: {
    getPageReady: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    image: {
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
.sub-hero {
  position: relative;
}

.sub-hero__title {
  position: absolute;
  bottom: 0;
  left: -0.1em;
  z-index: 3;
  font-size: calc(100vw * 92 / 375);
  font-weight: $font-Ubuntu-bold;
  line-height: 0.75;
  color: $color-white;
  text-transform: uppercase;
  letter-spacing: -0.045em;
  mix-blend-mode: overlay;
  //
  @include touch {
    transform: translateY(50%);
  }
  //
  @include desktop {
    font-size: calc(100vw * 230 / 1024);
  }
}

.sub-hero__figure {
  position: relative;
  z-index: 1;
  height: calc(100vh / 3);
  filter: saturate(0);
  //
  @include bg-cover;
  //
  @include desktop {
    height: calc(100vh / 3 * 2);
  }
}

.sub-hero__bg {
  z-index: 2;
  background-color: $color-gray-level1;
  mix-blend-mode: overlay;
  //
  @include overlay;
}
</style>
