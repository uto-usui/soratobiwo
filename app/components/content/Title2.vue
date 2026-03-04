<script setup lang="ts">
interface TitleItem {
  titleEn: string
  titleJa: string
}

interface Props {
  item: TitleItem
}

defineProps<Props>()
</script>

<template>
  <h2 class="title2">
    <div class="title2-en">{{ item.titleEn }}</div>
    <div class="title2-ja">{{ item.titleJa }}</div>
  </h2>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.title2 {
  position: relative;
  margin-bottom: 30px;

  @include desktop {
    margin-bottom: calc(100vw * 35 / 1024);
  }
}

.title2-en {
  height: 0.85em;
  font-size: calc(100vw * 45 / 375);
  font-weight: $font-Nunito-bold;
  color: $color-primary;
  text-align: right;
  text-transform: uppercase;
  mix-blend-mode: multiply;

  @include touch {
    margin-right: calc(100vw * 30 / 375 * -1);
    margin-left: calc(100vw * 30 / 375 * -1);
  }

  @include desktop {
    height: 0.75em;
    margin-left: calc(100vw * 90 / 1024 * -1);
    font-size: calc(100vw * 120 / 1024);
    line-height: 0.85;
    text-align: left;
  }
}

.title2-ja {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: calc(100vw * 14 / 375);
  color: $color-gray-level4;
  opacity: 0.8;

  @include desktop {
    font-size: calc(100vw * 14 / 1024);
  }
}
</style>
