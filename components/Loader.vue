<template>
  <div :class="[{ 'is-hide': getPageReady }]" class="loader">
    <div class="loader__inner">
      <div class="loader__text">
        soratobiwo
      </div>
      <div class="loader__line">
        <div class="loader__line-bg" />
      </div>
    </div>
  </div>
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
  backface-visibility: hidden;
  //
  &.is-hide {
    pointer-events: none;
    opacity: 0;
    will-change: opacity;
    transition: opacity 0.35s $easeOutSine;
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

.loader__line {
  position: relative;
  z-index: 2;
  width: 100px;
  height: 2px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
  backface-visibility: hidden;
  //
  &::after {
    z-index: 9;
    content: '';
    background-color: $color-blue;
    transform: scaleX(0);
    will-change: transform;
    backface-visibility: hidden;
    animation: loader infinite 0.8s $easeInOutSine both;
    //
    @include overlay;
  }
}
// v-if="!getPageReady"
.loader__line-bg {
  z-index: -1;
  background-color: rgba($color-blue, 0.1);
  backface-visibility: hidden;
  //
  @include overlay;
}

@keyframes loader {
  0% {
    transform: scaleX(0);
    transform-origin: 0% 50%;
  }

  30% {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }

  59.9% {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }

  60% {
    transform: scaleX(1);
    transform-origin: 100% 50%;
  }

  80% {
    transform: scaleX(0);
    transform-origin: 100% 50%;
  }

  100% {
    transform: scaleX(0);
    transform-origin: 0% 50%;
  }
}
</style>
