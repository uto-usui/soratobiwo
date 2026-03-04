<script setup lang="ts">
// Thanks layout - simplified layout without navigation
</script>

<template>
  <div class="body is-ready">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.body {
  min-height: 100vh;
  background-color: $color-primary;
}
</style>

<style lang="scss">
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
