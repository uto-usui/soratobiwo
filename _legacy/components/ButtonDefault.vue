<template>
  <div v-text="text" class="button-default" />
</template>

<script>
export default {
  name: 'ButtonDefault',
  props: {
    text: {
      type: String,
      default: 'Click for details',
    },
  },
}
</script>

<style lang="scss" scoped>
.button-default {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 105px;
  height: 32px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: calc(32px / 2);
  //
  @include desktop {
    width: 120px;
    height: 30px;
    font-size: 1.2rem;
    border-radius: calc(30px / 2);
  }
  //
  &.button-default--blue {
    background-color: $color-blue;
  }
  //
  &.button-default--red {
    background-color: $color-red;
  }
  //
  &.button-default--red-invert {
    color: $color-blue;
    background-color: $color-red;
  }
  //
  &.button-default--green {
    background-color: $color-green;
  }
  //
  &.button-default--text-white {
    color: $color-white;
  }
  //
  &.button-default--text-blue {
    color: $color-blue;
  }
  //
  &.button-default--text-green {
    color: $color-green;
  }
}
</style>
