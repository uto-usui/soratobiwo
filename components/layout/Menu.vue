<template>
  <div :class="[{'is-open': getMenuOpen}]" class="menu">
    <div class="menu__inner">
      <ul class="menu__list">
        <li
          v-for="(item, index) in links"
          :key="`menu${index}`"
          class="menu__item"
        >
          <span class="menu__item-inner">
            <a
              href="#"
              class="menu__target"
              @click="setMenuOpen(false)"
              v-html="item"
            />/
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    getMenuOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * ID List
       */
      links: ['Latest01', 'Magazine', 'Special01', 'Videos', 'Event'],
    }
  },
  computed: {
    //
  },
  methods: {
    ...mapActions(['setMenuOpen']),
  },
}
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $z-menu;
  padding-top: 35px;
  padding-right: $section-gutter-mobile;
  padding-left: $section-gutter-mobile;
  pointer-events: none;
  will-change: transform;
  //
  @include desktop {
    padding-top: 45px;
    padding-right: $section-gutter-desktop;
    padding-left: $section-gutter-desktop;
  }
  //
  &::after {
    position: absolute;
    top: 0;
    right: 50%;
    bottom: 0;
    left: 0;
    z-index: 5;
    content: '';
    background-color: $color-white;
    transition: transform 1s $easeInOutLongExpo;
    transform: scaleY(0);
    transform-origin: center top;
    will-change: transform;
  }
  //
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 50%;
    z-index: 5;
    content: '';
    background-color: $color-white;
    transition: transform 0.75s $easeInOutLongExpo;
    transform: scaleY(0);
    transform-origin: center top;
    will-change: transform;
  }
  //
  &.is-open {
    pointer-events: auto;
    //
    &::after {
      transform: scaleY(1);
      transform-origin: center bottom;
    }
    //
    &::before {
      transition-delay: 0.25s;
      transform: scaleY(1);
      transform-origin: center bottom;
    }
  }
}

.menu__inner {
  position: relative;
  z-index: 9;
  padding-top: 28px;
  //
  @include desktop {
    padding-top: 40px;
  }
}

.menu__list {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
}

.menu__item {
  overflow: hidden;
}

.menu__item-inner {
  display: inline-block;
  font-size: 3rem;
  line-height: calc(1em * 80 / 60);
  color: $color-blue;
  will-change: transform;
  transition: transform 0.6s $easeInOutLongExpo;
  transform: translateY(125%);
  //
  @include desktop {
    font-size: calc(92.5vw / 14);
  }
  //
  .menu.is-open & {
    transform: translateY(0);
  }}
}

.menu__target {
  display: inline-block;
  color: inherit;
  //
  @include desktop {
    //
    &:hover {
      color: $color-green;
    }
  }
}
</style>
