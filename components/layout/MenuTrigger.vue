<template>
  <div class="menu-trigger">
    <a @click.prevent="toggleMenuOpen" class="menu-trigger__inner">
      <p class="menu-trigger__text">
        menu
      </p>
      <div class="menu-trigger__bar-wrap">
        <div class="menu-trigger__bar" />
        <div class="menu-trigger__bar" />
      </div>
    </a>
    <div class="menu-trigger__bg"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MenuTrigger',
  methods: {
    ...mapActions(['toggleMenuOpen']),
  },
}
</script>

<style lang="scss" scoped>
.menu-trigger {
  position: fixed;
  right: calc(100vw * 20 / 375);
  bottom: 0;
  left: 0;
  z-index: $z-menu-trigger;
  height: 50px;
}

.menu-trigger__bg {
  background-color: rgba($color-primary, 0.95);
  //
  @include overlay;
}

.menu-trigger__inner {
  position: fixed;
  right: calc(100vw * 20 / 375 / 2);
  bottom: calc(50px / 2);
  z-index: $z-menu-bar;
  display: flex;
  align-items: center;
  transform: translateY(50%);
}

.menu-trigger__text {
  margin-right: 10px;
  font-family: $font-Nunito;
  font-size: 1.4rem;
  font-weight: $font-Nunito-bold;
  line-height: 0.75;
  color: $color-gray-level1;
}

.menu-trigger__bar-wrap {
  //
}

.menu-trigger__bar {
  width: 50px;
  height: 5px;
  background-color: $color-gray-level1;
  //
  + .menu-trigger__bar {
    margin-top: 5px;
  }
}
</style>
