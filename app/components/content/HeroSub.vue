<script setup lang="ts">
interface Props {
  getPageReady?: boolean
  title?: string
  image?: string
}

withDefaults(defineProps<Props>(), {
  getPageReady: false,
  title: '',
  image: '',
})
</script>

<template>
  <div class="sub-hero">
    <h1 v-if="title" class="sub-hero__title" v-html="title" />
    <div class="sub-hero__figure-wrap">
      <figure
        class="sub-hero__figure"
        :style="image ? { backgroundImage: `url(${image})` } : {}"
      />
    </div>
    <div class="sub-hero__bg" />
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

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
  pointer-events: none;
  mix-blend-mode: overlay;

  @include touch {
    transform: translateY(50%);
  }

  @include desktop {
    font-size: calc(100vw * 230 / 1024);
  }
}

.sub-hero__figure-wrap {
  position: relative;
  z-index: 1;
  height: calc(100vh / 3);
  overflow: hidden;

  @include desktop {
    height: calc(100vh / 3 * 2);
  }
}

.sub-hero__figure {
  filter: saturate(0);
  backface-visibility: hidden;
  box-shadow: 0 0 0 rgba($color-black, 0);
  transform: translateZ(1px);

  @include overlay;
  @include bg-cover;
}

.sub-hero__bg {
  z-index: 2;
  background-color: $color-gray-level1;
  mix-blend-mode: overlay;

  @include overlay;
}
</style>
