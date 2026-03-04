<template>
  <transition name="loading">
    <div v-if="!getPageReady" class="loader">
      <div class="loader__inner">
        <div class="loader__text">
          <SpliteText
            v-for="(item, index) in `_loading`"
            :key="index"
            :item="item"
            :index="index"
            :duration="0.5"
            :delay="Math.random() * 0.25"
          ></SpliteText>
        </div>
        <div class="loader__line">
          <div class="loader__line-bg" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SpliteText from '~/components/SpliteText'

export default {
  name: 'Loader',
  components: { SpliteText },
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
  clip-path: $clip-open;
  pointer-events: none;
  background-color: $color-gray-level2;
  backface-visibility: hidden;
  transform: skew(0deg);
  will-change: clip-path, transform;
  //
  &.loading-enter-active {
    transition: all 0.4s $easePowerInOut;
  }
  //
  &.loading-leave-active {
    transition: all 0.5s $easePowerInOut;
  }
  //
  &.loading-enter {
    clip-path: $clip-top;
    transform: skewX(-3deg);
  }

  &.loading-leave-to {
    clip-path: $clip-bottom;
    transform: skewY(3deg);
  }
}

.loader__inner {
  //
}

.loader__text {
  font-size: 2rem;
  font-weight: bold;
  color: $color-red;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  //

  span {
    animation: flash 1s infinite steps(1) both;
  }
}
</style>
