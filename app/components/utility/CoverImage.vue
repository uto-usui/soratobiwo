<script setup lang="ts">
interface Props {
  src: string
  srcset?: string
  sizes?: string
  alt?: string
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
}

withDefaults(defineProps<Props>(), {
  srcset: undefined,
  sizes: undefined,
  alt: '',
  loading: undefined,
  fetchpriority: undefined,
})

const imgRef = ref<HTMLImageElement>()
const isLoaded = ref(false)

const onLoad = () => {
  isLoaded.value = true
}

onMounted(() => {
  // 静的に書き出した HTML ではハイドレーション前に読み終わることがあり、その場合 load は二度と発火しない
  const img = imgRef.value
  if (img?.complete && img.naturalWidth) onLoad()
})
</script>

<template>
  <img
    ref="imgRef"
    class="cover-image"
    :class="{ 'is-loaded': isLoaded }"
    :src="src"
    :srcset="srcset"
    :sizes="sizes"
    :alt="alt"
    :loading="loading"
    :fetchpriority="fetchpriority"
    decoding="async"
    @load="onLoad"
  >
</template>

<style lang="scss" scoped>
.cover-image {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s $easeOutSine;

  &.is-loaded {
    opacity: 1;
  }
}
</style>
