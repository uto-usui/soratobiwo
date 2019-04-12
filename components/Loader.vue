<template>
  <transition name="loading">
    <div v-if="!getPageReady" class="loader">
      <div class="loader__inner">
        <div class="loader__text">
          soratobiwo
        </div>
        <div class="loader__line">
          <div class="loader__line-bg" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loader',
  components: {},
  props: {
    getPageReady: {
      type: Boolean,
      default: false,
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
.loader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $z-loading;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  background-color: $color-gray-level2;
  backface-visibility: hidden;
  transform: skew(0deg);
  clip-path: $clip-open;
  will-change: clip-path, transform;
  //
  &.loading-enter-active {
    transition: all 0.8s $easePowerInOut;
  }
  //
  &.loading-leave-active {
    transition: all 0.5s $easePowerInOut;
  }
  //
  &.loading-enter {
    transform: skewX(-3deg);
    clip-path: $clip-top;
  }

  &.loading-leave-to {
    transform: skewY(3deg);
    clip-path: $clip-bottom;
  }
}

.loader__inner {
  //
}

.loader__text {
  z-index: 9;
  font-size: 1.4rem;
  font-weight: bold;
  color: $color-blue;
  letter-spacing: 0.1em;
}
</style>
