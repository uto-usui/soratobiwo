<template>
  <nuxt-link to="/" class="button-close" />
</template>

<style lang="scss" scoped>
.button-close {
  position: absolute;
  top: 15px;
  right: 25px;
  display: block;
  width: 25px;
  height: 25px;
  color: inherit;

  @include desktop {
    top: -10px;
    right: 0;
  }

  &::before {
    position: absolute;
    top: 50%;
    right: 0;
    width: 25px;
    height: 0;
    content: '';
    border-top: solid 1px currentColor;
    transform: rotate(45deg);

    @include desktop {
      width: 35px;
    }
  }

  &::after {
    position: absolute;
    top: 50%;
    right: 0;
    width: 25px;
    height: 0;
    content: '';
    border-top: solid 1px currentColor;
    transform: rotate(-45deg);

    @include desktop {
      width: 35px;
    }
  }
}
</style>
