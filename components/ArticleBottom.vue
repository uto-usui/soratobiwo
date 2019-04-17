<template>
  <n-link to="../" class="article-bottom">
    <div class="article-bottom__inner">
      <figure v-lazy:background-image="image" class="article-bottom__figure" />
      <div class="article-bottom__bg" />
    </div>
    <div class="article-bottom__text">back to list</div>
  </n-link>
</template>

<script>
export default {
  name: 'ArticleBottom',
  props: {
    image: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.article-bottom {
  position: relative;
  z-index: 1;
  display: block;
  margin-right: calc(100vw * 30 / 375 * -1);
  margin-left: calc(100vw * 30 / 375 * -1);
  //
  @include desktop {
    top: calc(100vh / 3 / 3 * -1);
    margin-right: calc(100vw * 30 / 1024 * -1);
    margin-left: calc(100vw * 30 / 1024 * -1);
  }
}

.article-bottom__inner {
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: $color-gray-level1;
}

.article-bottom__figure {
  position: relative;
  z-index: 1;
  height: calc(100vh / 2);
  filter: saturate(0);
  //
  transition: filter 2s $easeOutSine, transform 5s $easeFadeIn;
  will-change: filter, transform;
  //
  @include bg-cover;
  //
  @include desktop {
    height: calc(100vh / 3 + 100vh / 3 / 3 * 2);
    //
    .article-bottom:hover & {
      filter: saturate(1);
      transform: scale(1.05);
    }
  }
}

.article-bottom__bg {
  z-index: 2;
  background-color: $color-gray-level1;
  mix-blend-mode: overlay;
  transition: opacity 5s $easeFadeIn;
  //
  @include overlay;
  //
  .article-bottom:hover & {
    // opacity: 0;
  }
}

.article-bottom__text {
  position: relative;
  z-index: 5;
  display: inline-block;
  padding-top: 40px;
  font-size: 1.4rem;
  font-weight: $font-Ubuntu-bold;
  color: $color-white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-bottom: 2px solid currentColor;
  //
  @include desktop {
    //
  }
  //
  @include widescreen {
    font-size: 1.6rem;
  }
  //
  &::after {
    position: absolute;
    top: -30px;
    left: 50%;
    width: 1px;
    height: 50px;
    content: '';
    background-color: currentColor;
  }
}
</style>
