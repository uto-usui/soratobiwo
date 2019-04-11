<template>
  <n-link to="/" class="button-close" />
</template>

<style lang="scss" scoped>
.button-close {
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
  background-color: $color-red;

  &::before {
    position: absolute;
    top: 50%;
    right: 50%;
    width: 25px;
    height: 0;
    content: '';
    border-top: solid 1px $color-gray-level1;
    transform: translateX(50%) rotate(45deg);
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
  }
}
</style>
