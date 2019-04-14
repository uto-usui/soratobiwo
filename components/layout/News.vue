<template>
  <div
    :class="[
      {
        'is-open': $store.state.route.fullPath === '/' || getMenuOpen,
        'is-sub': $store.state.route.fullPath !== '/' && getIsDesktop,
      },
    ]"
    class="news"
  >
    <div class="news__inner">
      <h2 class="news__title">
        <nuxt-link class="news__target" to="/news/">News</nuxt-link>
      </h2>
      <p class="news__text">
        <nuxt-link
          ref="text"
          class="news__target"
          :to="`/news/${newsData[counter].id}/`"
          v-text="newsData[counter].title"
        />
      </p>
    </div>
    <div class="news__bg" />
  </div>
</template>

<script>
import ShuffleText from 'shuffle-text'
import { pause } from 'Js/animation'

import newsJson from '~/assets/json/news'

const newsData = newsJson.slice(0, 5)

export default {
  name: 'News',
  props: {
    getMenuOpen: {
      type: Boolean,
      default: false,
    },
    getIsDesktop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newsData,
      sfText: null,
      links: [],
      counter: 0,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.textAnimationInit()
      this.textAnimation()
    })
  },
  beforeDestroy() {
    this.sfText && this.sfText.dispose()
  },
  methods: {
    textAnimationInit() {
      this.sfText && this.sfText.dispose()
      this.sfText = new ShuffleText(this.$refs.text.$el)
      this.sfText.duration = 1000
    },
    async textAnimation() {
      this.sfText.setText(this.newsData[this.counter].title)
      this.sfText.start()
      this.counterNext()
      await pause(3)
      this.textAnimation()
    },
    counterNext() {
      if (this.counter >= this.newsData.length - 1) {
        this.counter = 0
      } else {
        this.counter++
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.news {
  position: fixed;
  right: calc(100vw * 20 / 375 / 2);
  bottom: calc(100vh * 140 / 667);
  z-index: $z-contact;
  width: calc(100vw * 166 / 375);
  height: calc(100vw * 94 / 375);
  color: $color-gray-level1;
  pointer-events: none;
  border: 5px solid currentColor;
  //
  opacity: 0;
  //
  @include desktop {
    right: calc(100vw * 158 / 1024);
    bottom: calc(100vh * 283 / 768);
    width: calc(100vw * 222 / 1024);
    height: calc(100vw * 124 / 1024);
  }
  //
  @include widescreen {
    right: calc(100vw * 387 / 1280);
    bottom: calc(100vh * 245 / 800);
    width: calc(100vw * 222 / 1280);
    height: calc(100vw * 124 / 1280);
  }
  //
  &.is-open {
    pointer-events: auto;
    opacity: 1;
  }
  //
  &.is-sub {
    @include desktop {
      top: calc(100vw * 30 / 1024);
      right: calc(100vw / 3);
      pointer-events: auto;
      opacity: 1;
      transform: translateX(100%);
    }
    //
    @include widescreen {
      top: calc(100vw * 30 / 1280);
    }
  }
}

.news__bg {
  z-index: 1;
  background-color: $color-white;
  //
  @include overlay;
}

.news__inner {
  z-index: 2;
  padding: calc(100vw * 5 / 375);
  //
  @include overlay;
  //
  @include desktop {
    padding: calc(100vw * 5 / 1024);
  }
}

.news__title {
  position: absolute;
  right: calc(100vw * 5 / 375);
  bottom: calc(100vw * 5 / 375);
  font-size: 1.4rem;
  font-weight: bold;
  //
  @include desktop {
    right: calc(100vw * 5 / 1024);
    bottom: calc(100vw * 5 / 1024);
    font-size: calc(100vw * 18 / 1024);
  }
  //
  @include widescreen {
    font-size: calc(100vw * 18 / 1280);
  }
}

.news__text {
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 1.35;
  text-align: left;
  //
  @include desktop {
    font-size: calc(100vw * 18 / 1024);
  }
  //
  @include widescreen {
    font-size: calc(100vw * 18 / 1280);
  }
}

.news__target {
  color: inherit;
  //
  &:hover {
    //
  }
}
</style>
