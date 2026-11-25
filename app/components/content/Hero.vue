<script setup lang="ts">
import { DisplacementSlider } from '~/utils/webgl'

interface Props {
  getPageReady?: boolean
}

withDefaults(defineProps<Props>(), {
  getPageReady: false,
})

// canvas が描けるまで、1枚目のスライドの縮小版をぼかして敷く
const slidePlaceholder = imageInfo('/images/2026/image2.webp')?.placeholder

const canvasRef = ref<HTMLCanvasElement>()
const isCanvasReady = ref(false)
let slider: DisplacementSlider | null = null

// Slider images (`-800` / `-1600` variants exist for each)
const imageNames = ['image2', 'image6', 'image8', 'image19']

const displacementImage = '/images/texture/noise.jpg'

onMounted(async () => {
  if (!canvasRef.value) return

  // canvas は devicePixelRatio を掛けずに描くので、CSS 上の幅で足りるサイズを選ぶ
  const width = canvasRef.value.clientWidth <= 800 ? 800 : 1600
  const images = imageNames.map((name) => `/images/2026/${name}-${width}.webp`)

  try {
    slider = new DisplacementSlider(canvasRef.value, {
      images,
      displacementImage,
      autoPlay: true,
      autoPlaySpeed: 5000,
      displaceScale: [0.08, 0.04],
      transitionDuration: 1200,
    })

    await slider.init()
    isCanvasReady.value = true
  } catch (error) {
    console.warn('WebGL initialization failed:', error)
  }
})

onBeforeUnmount(() => {
  slider?.destroy()
  slider = null
})
</script>

<template>
  <div class="hero">
    <div class="hero__main">
      <div
        v-if="slidePlaceholder"
        class="hero__placeholder"
        :style="{ backgroundImage: `url(${slidePlaceholder})` }"
      />
      <canvas ref="canvasRef" class="hero__canvas" :class="{ 'is-ready': isCanvasReady }" />
    </div>

    <div class="hero-sub hero-sub--lg">
      <figure class="hero-sub__figure">
        <UtilityCoverImage
          src="/images/hero/item7.jpg"
          sizes="(min-width: 1024px) 25vw, 67vw"
          fetchpriority="high"
        />
      </figure>
      <div class="hero-sub__overlay" />
      <div class="hero__sub-tape" />
    </div>

    <div class="hero-sub hero-sub--sm">
      <figure class="hero-sub__figure">
        <UtilityCoverImage src="/images/hero/item13.jpg" sizes="(min-width: 1024px) 18vw, 47vw" />
      </figure>
      <div class="hero-sub__overlay" />
      <div class="hero__sub-tape" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/sass/foundation/mixin/mixin' as *;

.hero {
  //
}

.hero__images {
  position: absolute;
  display: none;
  pointer-events: none;
  opacity: 0;
}

.hero__placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  filter: blur(16px);
  // ぼかしで縁が透けるので、少し広げて .hero__main の overflow で切る
  transform: scale(1.1);
}

.hero__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s $easeOutSine;

  &.is-ready {
    opacity: 1;
  }
}

.hero__main {
  position: fixed;
  top: calc(100vw * 20 / 375);
  left: 0;
  width: calc(100vw * 300 / 375);
  height: calc(100vh * 200 / 667);
  overflow: hidden;
  background-color: $color-gray-level2;

  @include desktop {
    top: calc(100vw * 30 / 1024);
    width: calc(100vw - 100vw * 30 / 1024);
    height: calc(100vh * 482 / 768);
  }

  @include widescreen {
    top: calc(100vw * 30 / 1280);
    width: calc(100vw - 100vw * 30 / 1280);
  }

  &::after {
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

  &--lg {
    bottom: calc(100vh * 30 / 667);
    left: 0;
    width: calc(100vw * 250 / 375);
    height: calc(100vw * 173 / 375);

    @include desktop {
      bottom: calc(100vh * 23 / 768);
      left: calc(100vw * 463 / 1024);
      width: calc(100vw * 250 / 1024);
      height: calc(100vw * 173 / 1024);
    }

    @include widescreen {
      bottom: calc(100vw * 30 / 1280 / 2);
      left: calc(100vw * 465 / 1280);
      width: calc(100vw * 320 / 1280);
      height: calc(100vw * 180 / 1280);
    }
  }

  &--sm {
    right: 40px;
    bottom: calc(100vh * 190 / 667);
    width: calc(100vw * 173 / 375);
    height: calc(100vw * 120 / 375);

    @include desktop {
      right: calc(100vw * 90 / 1024);
      bottom: calc(100vh * 115 / 768);
      left: auto;
      width: calc(100vw * 173 / 1024);
      height: calc(100vw * 120 / 1024);
    }

    @include widescreen {
      right: calc(100vw * 90 / 1280);
      width: calc(100vw * 225 / 1280);
      height: calc(100vw * 126 / 1280);
    }
  }
}

.hero-sub__figure {
  background-color: $color-gray-level2;

  @include overlay;

  .hero-sub.hero-sub--lg & {
    filter: saturate(0);
  }
}

.hero-sub__overlay {
  mix-blend-mode: overlay;

  @include overlay;

  .hero-sub.hero-sub--lg & {
    background-color: $color-gray-level1;
  }

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

  @include desktop {
    top: 0;
    width: calc(100vh * 120 / 768);
    height: calc(100vh * 40 / 768);

    .hero-sub.hero-sub--lg & {
      left: 0;
      transform: skewX(3deg) translateX(-25%) rotate(-30deg);
    }

    .hero-sub.hero-sub--sm & {
      right: 0;
      left: auto;
      transform: skewX(3deg) translateX(25%) rotate(30deg);
    }
  }
}
</style>
