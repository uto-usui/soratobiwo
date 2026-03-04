<script setup lang="ts">
// Post - content post wrapper
</script>

<template>
  <div class="post">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.post {
  font-weight: bold;
  color: $color-white;
  text-align: justify;

  @include desktop {
    padding-left: calc(100vw * 90 / 1024);
  }

  + .post {
    margin-top: calc(100vw * 20 / 375);

    @include desktop {
      margin-top: calc(100vw * 100 / 1024);
    }
  }
}
</style>
