<template>
  <div class="hero">
    <div class="hero__main">
      <canvas ref="canvas" class="hero__canvas"></canvas>
    </div>

    <div class="hero-sub hero-sub--lg">
      <figure
        v-lazy:background-image="require('Images/hero/item7.jpg')"
        class="hero-sub__figure"
      />
      <div class="hero-sub__overlay" />
      <div class="hero__sub-tape" />
    </div>

    <div class="hero-sub hero-sub--sm">
      <figure
        v-lazy:background-image="require('Images/hero/item13.jpg')"
        class="hero-sub__figure"
      />
      <div class="hero-sub__overlay" />
      <div class="hero__sub-tape" />
    </div>
  </div>
</template>

<script>
import { pause } from 'Js/animation'
import { CanvasSlides } from 'Js/distotion'

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
      images: [
        require('Images/2020/1.jpg'),
        require('Images/2020/2.jpg'),
        require('Images/2020/3.jpg'),
      ],
      isActive: true,
      imagesSrc: [],
      counter: 0,
      mainCanvas: null,
    }
  },
  computed: {
    //
  },
  watch: {
    //
  },
  created() {
    //
  },
  mounted() {
    this.$nextTick(() => {
      this.canvasInit()
    })
  },
  beforeDestroy() {
    console.log('🗑 hero beforeDestroy')
    this.isActive = false
    this.mainCanvas.destroy()
  },
  methods: {
    // imageLoaded(instance) {
    //   instance.images.forEach(el => {
    //     this.imagesSrc.push(el.img.src)
    //   })
    //   this.isLoaded = true
    // },
    canvasInit() {
      this.mainCanvas = new CanvasSlides({
        target: this.$refs.canvas,
        sprites: this.images,
        displacementImage: require('Images/texture/noise.jpg'),
        autoPlay: true,
        autoPlaySpeed: [1, 3],
        displaceScale: [100, 50],
        displaceScaleTo: [100, 50],
        interactive: true,
        interactionEvent: 'click',
      })
      // console.log('initCanvasSlide', this.mainCanvas)
      this.animation()
    },
    async animation() {
      await pause(2.5)
      this.isActive && this.counterNext()
      await pause(2.5)
      this.animation()
    },
    counterNext() {
      if (this.counter >= this.images.length - 1) {
        this.counter = 0
      } else {
        this.counter++
      }
      this.mainCanvas.moveSlider(this.counter)
    },
  },
}
</script>

<style lang="scss" scoped>
.hero {
  //
}

.hero__images {
  position: absolute;
  display: none;
  pointer-events: none;
  opacity: 0;
}

.hero__canvas {
  //
  @include overlay;
  // mix-blend-mode: multiply;
  // opacity: 0.15;
}

.hero__main {
  position: fixed;
  top: calc(100vw * 20 / 375);
  left: 0;
  width: calc(100vw * 300 / 375);
  height: calc(100vh * 200 / 667);
  overflow: hidden;
  background-color: $color-gray-level2;
  //
  @include desktop {
    top: calc(100vw * 30 / 1024);
    width: calc(100vw - 100vw * 30 / 1024);
    height: calc(100vh * 482 / 768);
  }
  //
  @include widescreen {
    top: calc(100vw * 30 / 1280);
    width: calc(100vw - 100vw * 30 / 1280);
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

.hero-sub {
  position: absolute;
  //
  &--lg {
    bottom: calc(100vh * 30 / 667);
    left: 0;
    width: calc(100vw * 250 / 375);
    height: calc(100vw * 173 / 375);
    //
    @include desktop {
      bottom: calc(100vh * 23 / 768);
      left: calc(100vw * 463 / 1024);
      width: calc(100vw * 250 / 1024);
      height: calc(100vw * 173 / 1024);
    }
    //
    @include widescreen {
      bottom: calc(100vw * 30 / 1280 / 2);
      left: calc(100vw * 465 / 1280);
      width: calc(100vw * 320 / 1280);
      height: calc(100vw * 180 / 1280);
    }
  }
  //
  &--sm {
    right: 40px;
    bottom: calc(100vh * 222 / 667);
    width: calc(100vw * 173 / 375);
    height: calc(100vw * 120 / 375);
    //
    @include desktop {
      right: calc(100vw * 90 / 1024);
      bottom: calc(100vh * 115 / 768);
      left: auto;
      width: calc(100vw * 173 / 1024);
      height: calc(100vw * 120 / 1024);
    }
    //
    @include widescreen {
      right: calc(100vw * 90 / 1280);
      width: calc(100vw * 225 / 1280);
      height: calc(100vw * 126 / 1280);
    }
  }
}

.hero-sub__figure {
  //
  @include overlay;
  @include bg-cover;
  //
  .hero-sub.hero-sub--lg & {
    filter: saturate(0);
  }
}

.hero-sub__overlay {
  mix-blend-mode: overlay;
  //
  @include overlay;
  //
  .hero-sub.hero-sub--lg & {
    background-color: $color-gray-level1;
  }
  //
  .hero-sub.hero-sub--sm & {
    background-color: $color-primary;
  }
}

.hero__sub-tape {
  position: absolute;
  top: calc(30px / 3 * 1 * -1);
  left: calc(100vw * 38 / 375);
  width: calc(100vw * 120 / 375);
  height: calc(100vw * 40 / 375);
  background-color: $color-blue;
  mix-blend-mode: overlay;
  transform: skewX(5deg);
  //
  @include desktop {
    top: 0;
    width: calc(100vh * 120 / 768);
    height: calc(100vh * 40 / 768);
    //
    .hero-sub.hero-sub--lg & {
      left: 0;
      transform: skewX(3deg) translateX(-25%) rotate(-30deg);
    }
    //
    .hero-sub.hero-sub--sm & {
      right: 0;
      left: auto;
      transform: skewX(3deg) translateX(25%) rotate(30deg);
    }
  }
}
</style>
