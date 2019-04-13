<template>
  <div
    :class="[
      { 'is-ready': getPageReady },
      { 'is-ie': $ua.browser() === 'Internet Explorer' },
    ]"
    class="body"
  >
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      //
    })
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.body {
  min-height: 100vh;
  background-color: $color-primary;
}
</style>

<style lang="scss">
@import '~Sass/foundation/_reset';
@import '~Sass/foundation/base/_base';
@import '~Sass/animation/_keyframes';
@import '~Sass/object/utility/_utility';

@font-face {
  font-family: 'MyYuGothicM';
  font-weight: normal;
  src: local('YuGothic-Medium'), local('Yu Gothic Medium'),
    local('YuGothic-Regular');
}

@font-face {
  font-family: 'MyYuGothicM';
  font-weight: bold;
  src: local('YuGothic-Bold'), local('Yu Gothic');
}
</style>
