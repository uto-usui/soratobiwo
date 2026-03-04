<script setup lang="ts">
interface Props {
  image?: string
}

withDefaults(defineProps<Props>(), {
  image: '',
})
</script>

<template>
  <div v-if="image" class="post-image">
    <UtilityLazyImage :src="`/images/${image}`" alt="artist image" />
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.post-image {
  margin-right: calc(100vw * 30 / 375 * -1);
  margin-bottom: 20px;
  margin-left: calc(100vw * 30 / 375 * -1);

  @include desktop {
    margin-right: calc(100vw * 30 / 1024 * -1);
    margin-bottom: calc(100vw * 35 / 1024);
    margin-left: calc(100vw * 30 / 1024 * -1 + 100vw * 90 / 1024 * -1);
  }
}
</style>
