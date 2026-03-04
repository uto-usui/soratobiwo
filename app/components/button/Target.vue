<script setup lang="ts">
import { useMouseFollow } from '~/composables/useMouseFollow'

interface Props {
  full?: boolean
  maxOffset?: number
  hoverScale?: number
}

const props = withDefaults(defineProps<Props>(), {
  full: false,
  maxOffset: 8,
  hoverScale: 1.03,
})

const buttonRef = ref<HTMLElement>()

const { init, destroy } = useMouseFollow({
  maxOffset: props.maxOffset,
  hoverScale: props.hoverScale,
  speed: 0.12,
})

onMounted(() => {
  if (buttonRef.value) {
    init(buttonRef.value)
  }
})

onBeforeUnmount(() => {
  destroy()
})
</script>

<template>
  <div
    ref="buttonRef"
    :class="[{ 'is-full': full }]"
    class="button-target"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.button-target {
  display: inline-block;
  cursor: pointer;
  will-change: transform;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  &.is-full {
    width: 100%;
  }
}
</style>
