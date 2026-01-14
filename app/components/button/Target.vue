<script setup lang="ts">
// ButtonTarget - interactive button with GSAP animation
// GSAP animation will be implemented in Phase 7

interface Props {
  full?: boolean
}

withDefaults(defineProps<Props>(), {
  full: false,
})

// GSAP mouse interaction animation will be added in Phase 7
</script>

<template>
  <div :class="[{ 'is-full': full }]" class="button-target">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.button-target {
  display: inline-block;

  &.is-full {
    width: 100%;
  }
}
</style>
