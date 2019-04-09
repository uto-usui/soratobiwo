<template>
  <div
    :class="[{'is-open': $store.state.route.fullPath === '/' || getMenuOpen}]"
    class="news"
  >
    <div class="news__inner">
      <h2 class="news__title">
        News
      </h2>
      <p class="news__text">
        <nuxt-link class="news__target" to="/">
          new album release!!!
        </nuxt-link>
      </p>
    </div>
    <div class="news__bg" />
  </div>
</template>

<script>
export default {
  name: 'News',
  props: {
    getMenuOpen: {
      type: Boolean,
      default: false,
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
    opacity: 1;
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
