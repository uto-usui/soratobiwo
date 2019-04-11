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
  @include fullhd {
    width: 40px;
    height: 40px;
  }

  &::before {
    position: absolute;
    top: 50%;
    right: 50%;
    width: 25px;
    height: 0;
    content: '';
    border-top: solid 1px $color-gray-level1;
    transform: translateX(50%) rotate(45deg);
    //
    @include fullhd {
      width: 35px;
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
    transform: translateX(50%) rotate(-45deg);
    //
    @include fullhd {
      width: 35px;
    }
  }
}
</style>
