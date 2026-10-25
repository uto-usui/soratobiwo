<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
}

withDefaults(defineProps<Props>(), {
  src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  alt: '',
})

const imgRef = ref<HTMLImageElement>()
const isLoaded = ref(false)
const isInView = ref(false)

// Intersection Observer for lazy loading
onMounted(() => {
  if (!imgRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isInView.value = true
        observer.disconnect()
      }
    },
    { rootMargin: '500px' }
  )

  observer.observe(imgRef.value)
})

const onLoad = () => {
  isLoaded.value = true
}
</script>

<template>
  <img
    ref="imgRef"
    :src="isInView ? src : undefined"
    :alt="alt"
    :class="{ 'is-loaded': isLoaded }"
    @load="onLoad"
  />
</template>

<style lang="scss" scoped>
img {
  opacity: 0;
  transition: opacity 0.5s ease;

  &.is-loaded {
    opacity: 1;
  }
}
</style>
