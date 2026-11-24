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

// 読み込み完了で data-loaded を付けてフェードインする。
// 初回はローダーなしで書き出した HTML を見せるので、JS の準備を待たずに表示できるよう onload 属性で処理する
const markLoaded = 'this.dataset.loaded=""'
</script>

<template>
  <img
    class="cover-image"
    :src="src"
    :srcset="srcset"
    :sizes="sizes"
    :alt="alt"
    :loading="loading"
    :fetchpriority="fetchpriority"
    decoding="async"
    :onload="markLoaded"
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

  &[data-loaded] {
    opacity: 1;
  }
}
</style>
