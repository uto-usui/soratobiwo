<template>
  <div :class="[{ 'is-open': getMenuOpen }]" class="menu">
    <ul class="menu__list">
      <li
        v-for="(item, index) in links"
        :key="`menu${index}`"
        class="menu__item"
      >
        <span class="menu__item-inner">
          <nuxt-link
            :to="item === `home` ? `/` : item"
            class="menu__target"
            @click="setMenuOpen(false)"
            v-html="item"
          />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    //
  },
  data() {
    return {
      /**
       * ID List
       */
      links: ['home', 'profile', 'listen', 'live', 'follow', 'news'],
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
  top: calc(100vw * 30 / 1024 + 100vw * 396 / 1024);
  right: calc(100vw * 30 / 1024 + 100vw * 69 / 1024);
  z-index: $z-menu;
  transform: translateX(-15px) translateY(-100%);
  //
  @include widescreen {
    top: calc(100vw * 30 / 1280 + 100vw * 396 / 1280);
    right: calc(100vw * 30 / 1280 + 100vw * 69 / 1280);
  }
}

.menu__list {
  //
}

.menu__item {
  position: relative;
  text-align: right;
  //
  + .menu__item {
    margin-top: 2px;
  }
}

.menu__item-inner {
  display: inline-block;
  //
  .menu.is-open & {
    //transform: translateY(0);
  }
}

.menu__target {
  position: relative;
  display: inline-block;
  font-family: $font-Nunito;
  font-size: calc(100vw * 18 / 1024);
  font-weight: $font-Nunito-bold;
  color: $color-gray-level1;
  text-transform: uppercase;
  //
  @include widescreen {
    font-size: calc(100vw * 18 / 1280);
  }
  //
  &.nuxt-link-active {
    //
    &::after {
      position: absolute;
      top: 50%;
      right: -15px;
      width: 0;
      height: 0;
      content: '';
      border-color: transparent $color-red transparent transparent;
      border-style: solid;
      border-width: 5px 10px 5px 0;
      transform: translateY(-50%);
    }
  }
  //
  .menu__item:nth-of-type(1) & {
    &::after {
      display: none;
    }
  }
}
</style>
