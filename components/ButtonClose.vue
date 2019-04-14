<template>
  <n-link :to="path" class="button-close" />
</template>

<script>
export default {
  name: 'ButtonClose',
  props: {
    path: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.button-close {
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
  background-color: $color-red;
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

  &::before {
    position: absolute;
    top: 50%;
    right: 50%;
    width: 25px;
    height: 0;
    content: '';
    border-top: solid 1px $color-gray-level1;
    //
    transition: transform 0.3s $easeOutSine;
    transform: translateX(50%) rotate(45deg) translateZ(1px);
    //
    @include desktop {
      width: calc(100vw * 25 / 1024);
    }
    //
    @include widescreen {
      width: calc(100vw * 25 / 1280);
    }
  }

  &::after {
    position: absolute;
    top: 50%;
    right: 50%;
    width: 25px;
    height: 0;
    content: '';
    border-top: solid 1px $color-gray-level1;
    transition: transform 0.3s $easeOutSine;
    transform: translateX(50%) rotate(-45deg) translateZ(1px);
    //
    @include desktop {
      width: calc(100vw * 25 / 1024);
    }
    //
    @include widescreen {
      width: calc(100vw * 25 / 1280);
    }
  }
  //
  @include desktop {
    &:hover {
      //
      &::before {
        transform: translateX(50%) rotate(135deg) translateZ(1px);
      }
      //
      &::after {
        transform: translateX(50%) rotate(45deg) translateZ(1px);
      }
    }
  }
}
</style>
