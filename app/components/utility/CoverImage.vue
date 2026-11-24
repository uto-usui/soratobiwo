<script setup lang="ts">
interface Props {
  src: string
  /** 省略すると、scripts/image-variants.mjs が作った幅違いの WebP から組む */
  srcset?: string
  sizes?: string
  alt?: string
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
  /** PC 幅でしか表示しない画像。display: none でも lazy 画像は読まれることがあるので、PC 幅未満では空画像に差し替える */
  desktopOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  srcset: undefined,
  sizes: undefined,
  alt: '',
  loading: undefined,
  fetchpriority: undefined,
  desktopOnly: false,
})

const placeholder = computed(() => imageInfo(props.src)?.placeholder)
const resolvedSrcset = computed(() => props.srcset ?? imageSrcset(props.src))

const blankImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

// 読み込み完了で data-loaded を付けてフェードインする。
// 初回はローダーなしで書き出した HTML を見せるので、JS の準備を待たずに表示できるよう onload 属性で処理する
const markLoaded = 'this.dataset.loaded=""'
</script>

<template>
  <span class="cover-image">
    <span
      v-if="placeholder"
      class="cover-image__placeholder"
      :style="{ backgroundImage: `url(${placeholder})` }"
    />
    <picture>
      <source v-if="desktopOnly" media="(max-width: 1023px)" :srcset="blankImage">
      <!-- Vue は書いた順に属性を設定する。src を先に入れると lazy になる前に読み込みが始まるので、src は最後に置く -->
      <img
        class="cover-image__img"
        :loading="loading"
        :fetchpriority="fetchpriority"
        decoding="async"
        :onload="markLoaded"
        :alt="alt"
        :sizes="sizes"
        :srcset="resolvedSrcset"
        :src="src"
      >
    </picture>
  </span>
</template>

<style lang="scss" scoped>
.cover-image {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.cover-image__placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  filter: blur(16px);
  // ぼかしで縁が透けるので、少し広げて .cover-image の overflow で切る
  transform: scale(1.1);
  // 写真のフェードインが終わってから消す。同時に消すと途中で下の背景が透ける
  transition: opacity 0s 0.4s;

  .cover-image:has(.cover-image__img[data-loaded]) & {
    opacity: 0;
  }
}

.cover-image__img {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s $easeOutSine;

  &[data-loaded] {
    opacity: 1;
  }
}
</style>
