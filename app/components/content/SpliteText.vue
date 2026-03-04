<script setup lang="ts">
interface Props {
  duration?: number
  delay?: number
  index?: number
  item?: string
}

withDefaults(defineProps<Props>(), {
  duration: 0,
  delay: 0,
  index: 0,
  item: '',
})
</script>

<template>
  <span
    :style="{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }"
    class="sprite-text"
  >{{ item }}</span>
</template>

<style lang="scss" scoped>
.sprite-text {
  display: inline-block;
  backface-visibility: hidden;
}
</style>
