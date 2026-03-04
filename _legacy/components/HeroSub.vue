<template>
  <div class="sub-hero">
    <h1 v-if="title" v-html="title" class="sub-hero__title" />
    <div class="sub-hero__figure-wrap">
      <figure v-lazy:background-image="image" class="sub-hero__figure" />
    </div>
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
  background-color: $color-gray-level1;
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

.sub-hero__figure-wrap {
  position: relative;
  z-index: 1;
  height: calc(100vh / 3);
  overflow: hidden;
  //
  @include desktop {
    height: calc(100vh / 3 * 2);
  }
}

.sub-hero__figure {
  filter: saturate(0);
  backface-visibility: hidden;
  box-shadow: 0 0 0 rgba($color-black, 0);
  //
  &[lazy='loading'] {
    opacity: 0;
    transform: skewY(8deg) skewX(8deg) scale(1.2) translateZ(1px);
  }
  //
  &[lazy='loaded'] {
    opacity: 1;
    transition: all 1s $easeFadeIn;
    transform: skewY(0deg) skewX(0deg) scale(1) translateZ(1px);
  }
  //
  @include overlay;
  @include bg-cover;
}

.sub-hero__bg {
  z-index: 2;
  background-color: $color-gray-level1;
  mix-blend-mode: overlay;
  //
  @include overlay;
}
</style>
