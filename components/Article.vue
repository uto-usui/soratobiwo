<template>
  <article class="article">
    <div class="article__inner">
      <div class="article__head">
        <h1
          v-if="post.title"
          class="article__title"
          v-html="getIsDesktop ? post.titleDesktop : post.titleMobile"
        />
        <div class="article__head-inner">
          <time
            v-if="post.date"
            class="article__date"
            v-text="getDate(post.date)"
          />
          <p v-if="post.place" class="article__place" v-html="post.place" />
        </div>
      </div>
      <div class="article__body">
        <h2 v-if="post.title" class="article__title-sub" v-html="post.title" />
        <p
          v-if="getIsDesktop && post.place"
          class="article__place-pc"
          v-html="post.place"
        />
        <p v-if="post.act" class="article__act" v-html="post.act"></p>
        <p v-if="post.time" class="article__time" v-html="post.time"></p>
        <p v-if="post.fee" class="article__fee" v-html="post.fee"></p>
        <p v-if="post.info" class="article__info" v-html="post.info"></p>
      </div>
      <div class="article__close">
        <ButtonClose :path="`../`" />
      </div>
    </div>
  </article>
</template>

<script>
import dateMixin from '~/mixins/Date'

import ButtonClose from '~/components/ButtonClose'

export default {
  name: 'ListInner',
  components: { ButtonClose },
  mixins: [dateMixin],
  props: {
    post: {
      type: Object,
      default: () => {},
    },
    getIsDesktop: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.article {
  position: relative;
  z-index: 5;
  //
  @include desktop {
    padding: calc(2vw);
  }
}

.article__inner {
  position: relative;
  min-height: calc(100vh / 3 * 2);
  padding: calc(100vw * 25 / 375) calc(100vw * 20 / 375) calc(100vw * 25 / 375);
  color: $color-white;
  border: 5px solid currentColor;
  //
  @include desktop {
    width: calc(100vw / 2);
    height: calc(100vh / 3 * 2);
    padding: calc(100vw * 65 / 1024) calc(100vw * 80 / 1024);
  }
}

.article__head {
  // position: absolute;
}

.article__body {
  max-height: 100%;
  overflow: auto;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.5;
  text-align: justify;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  //
  @include desktop {
    font-size: calc(100vw * 12 / 1024);
    border-right: 5px solid currentColor;
  }
  //
  @include widescreen {
    font-size: calc(100vw * 12 / 1280);
  }
  //
  @include fullhd {
    font-size: calc(100vw * 14 / 1600);
  }
  //
  @include touch {
    margin-top: 45px;
  }
  //
  p {
    margin-top: 1.5em;
    //
  }
  //
  /deep/ a {
    color: inherit;
    border-bottom: 2px solid currentColor;
  }
}

.article__info {
  line-height: 1.5;
  //
  @include desktop {
    line-height: 1.75;
  }
}

.article__title {
  font-size: calc(100vw * 18 / 375);
  font-weight: bold;
  line-height: 1.35;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  //
  @include desktop {
    position: absolute;
    top: -0.25em;
    left: calc(100% - 0.15em);
    font-size: calc(100vw * 34 / 1024);
    letter-spacing: normal;
    white-space: nowrap;
    transform: translateY(-100%) rotate(90deg);
    transform-origin: left bottom;
  }
}

.article__head-inner {
  //
  @include desktop {
    position: absolute;
    bottom: calc(100% + 0.2em);
    left: -5px;
    display: flex;
  }
}

.article__date {
  display: block;
  font-size: calc(100vw * 12 / 375);
  font-weight: bold;
  letter-spacing: -0.01em;
  //
  @include touch {
    margin-top: 10px;
  }
  //
  @include desktop {
    margin-right: calc(100vh * 20 / 768);
    font-size: calc(100vw * 12 / 1024);
  }
}

.article__place {
  font-size: calc(100vw * 12 / 375);
  font-weight: bold;
  letter-spacing: -0.01em;
  //
  @include touch {
    margin-top: 8px;
  }
  //
  @include desktop {
    font-size: calc(100vw * 12 / 1024);
  }
}

.article__close {
  position: absolute;
  right: 0;
  //
  @include touch {
    bottom: 0;
  }
  //
  @include desktop {
    top: 0;
  }
}
</style>
