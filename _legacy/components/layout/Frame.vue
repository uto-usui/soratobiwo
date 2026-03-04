<template>
  <div class="frame__wrap">
    <div class="frame frame--top" />
    <div class="frame frame--right" />
    <div class="frame frame--circle" />
    <div class="frame frame--rect" />
  </div>
</template>

<script>
export default {
  name: 'Frame',
}
</script>

<style lang="scss" scoped>
.frame {
  position: fixed;
  z-index: $z-line;
  //
  &--top {
    top: 0;
    right: 0;
    left: 0;
    height: calc(100vw * 20 / 375);
    background-color: $color-gray-level2;
    //
    @include desktop {
      height: calc(100vw * 30 / 1024);
    }
    //
    @include widescreen {
      height: calc(100vw * 30 / 1280);
    }
  }

  //
  &--right {
    top: 0;
    right: 0;
    bottom: 0;
    width: calc(100vw * 20 / 375);
    background-color: $color-gray-level2;
    //
    @include desktop {
      width: calc(100vw * 30 / 1024);
    }
    //
    @include widescreen {
      width: calc(100vw * 30 / 1280);
    }
  }

  //
  &--circle {
    top: 0;
    right: 0;
    z-index: $z-circle;
    width: calc(100vw * 20 / 375);
    height: calc(100vw * 20 / 375);
    background-color: $color-red;
    border-radius: 50%;
    //
    @include desktop {
      width: calc(100vw * 30 / 1024);
      height: calc(100vw * 30 / 1024);
    }
    //
    @include widescreen {
      width: calc(100vw * 30 / 1280);
      height: calc(100vw * 30 / 1280);
    }
  }

  //
  &--rect {
    top: 0;
    right: 0;
    z-index: 5;
    width: calc(100vw * 20 / 375);
    height: calc(100vw * 20 / 375);
    background-color: $color-white;
    //
    @include desktop {
      width: calc(100vw * 30 / 1024);
      height: calc(100vw * 30 / 1024);
    }
    //
    @include widescreen {
      width: calc(100vw * 30 / 1280);
      height: calc(100vw * 30 / 1280);
    }
  }
}
</style>
