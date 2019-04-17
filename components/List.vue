<template>
  <ul class="list">
    <li
      v-for="(item, index) in listData"
      :key="`listItem${index}`"
      class="list__item"
    >
      <ListInner :is-link="true" :slug="item.id">
        <div class="list__content">
          <div class="list__top">
            <h2 v-if="item.title" class="list__title" v-html="item.title" />
          </div>

          <div class="list__figure-wrap is-hidden-touch">
            <figure
              v-lazy:background-image="
                item.wp ? item.hero : require(`Images/${item.hero}`)
              "
              class="list__figure"
            />
            <div class="list__bg" />
          </div>

          <div class="list__bottom">
            <time
              v-if="item.date"
              class="list__date"
              v-text="getDate(item.date)"
            />
            <p v-if="item.place" class="list__place" v-html="item.place" />
          </div>
        </div>
      </ListInner>
    </li>
  </ul>
</template>

<script>
import ListInner from '~/components/ListInner'

import dateMixin from '~/mixins/Date'

export default {
  name: 'List',
  components: { ListInner },
  mixins: [dateMixin],
  props: {
    getPageReady: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    listData: {
      type: Array,
      default: null,
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
  created() {
    //
  },
  mounted() {
    this.$nextTick(() => {
      //
    })
  },
  methods: {
    //
  },
}
</script>

<style lang="scss" scoped>
.list {
  //
  @include desktop {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: calc(100vw * 15 / 1024 * -1);
  }
}

.list__item {
  color: $color-white;
  border: 5px solid currentColor;
  //
  @include desktop {
    width: calc(100% / 3 - 100vw * 20 / 1024 / 2);
    margin-bottom: calc(100vw * 20 / 1024);
  }
  //
  + .list__item {
    @include touch {
      margin-top: calc(100vw * 20 / 375);
    }
  }
}

.list__content {
  position: relative;
  //
  @include desktop {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh / 3 * 2);
  }
}

.list__top {
  //
  @include desktop {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding: calc(100vh * 20 / 768);
    //
    transition: transform 0.5s $easeFadeIn;
    //
    .list__item:hover & {
      transform: translateY(10px);
    }
  }
}

.list__title {
  font-size: calc(100vw * 18 / 375);
  font-weight: bold;
  line-height: 1.35;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  //
  @include desktop {
    font-size: calc(100vw * 16 / 1024);
    line-height: 1.5;
  }
}

.list__bottom {
  //
  @include touch {
    margin-top: calc(100vw * 40 / 375);
  }
  //
  @include desktop {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: calc(100vh * 20 / 768);
    line-height: 1.5;
    //
    transition: transform 0.5s 0.1s $easeFadeIn;
    //
    .list__item:hover & {
      transform: translateY(-10px);
    }
  }
}

.list__date {
  display: block;
  font-size: calc(100vw * 12 / 375);
  font-weight: bold;
  letter-spacing: -0.01em;
  //
  @include desktop {
    font-size: calc(100vw * 12 / 1024);
  }
}

.list__place {
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

.list__figure-wrap {
  position: relative;
  z-index: 3;
  width: 100%;
  padding-top: calc(50vh * 148 / 768);
  padding-bottom: calc(50vh * 148 / 768);
  overflow: hidden;
}

.list__bg {
  z-index: 5;
  background-color: $color-gray-level1;
  mix-blend-mode: overlay;
  transition: opacity 1s $easeFadeIn;
  will-change: overlay;
  //
  @include overlay;
  //
  .list__item:hover & {
    opacity: 0;
  }
}

.list__figure {
  filter: saturate(0);
  transition: filter 1s $easeFadeIn, transform 1s $easeFadeIn;
  will-change: filter, transform;
  //
  @include overlay;
  @include bg-cover;
  //
  .list__item:hover & {
    filter: saturate(1);
    transform: scale(1.05);
  }
}

.list__tape {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 9;
  display: none;
  width: calc(100vw * 120 / 375);
  height: calc(100vw * 40 / 375);
  background-color: $color-blue;
  mix-blend-mode: overlay;
  opacity: 0.85;
  transform: skewX(5deg);
  //
  @include desktop {
    top: 0;
    width: calc(100vh * 120 / 768);
    height: calc(100vh * 40 / 768);
    transition: transform 1s $easeFadeIn;
    transform: skewX(5deg) translateX(-50%) translateY(-50%) rotate(5deg);
    //
    .list__item:hover & {
      transform: skewX(10deg) translateX(-50%) translateY(-50%) rotate(5deg);
    }
  }
}
</style>
