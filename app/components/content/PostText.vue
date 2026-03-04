<script setup lang="ts">
interface Props {
  text?: string
}

withDefaults(defineProps<Props>(), {
  text: '',
})
</script>

<template>
  <p class="post-text" v-html="text" />
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.post-text {
  position: relative;
  max-width: 550px;
  font-size: 1.2rem;
  line-height: 1.95;

  + .post-text {
    margin-top: 2em;
  }

  @include desktop {
    font-size: 1.4rem;
    line-height: 2.25;
  }

  @include fullhd {
    max-width: 650px;
    font-size: 1.6rem;
    line-height: 2.5;
  }
}
</style>
