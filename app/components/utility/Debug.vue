<script setup lang="ts">
import { useMainStore } from '~/stores/main'

const store = useMainStore()

const getPageWidth = computed(() => store.getPageWidth)
const getPageHeight = computed(() => store.getPageHeight)
const getPageScrollY = computed(() => store.getPageScrollY)
const getPageMouseX = computed(() => store.getPageMouseX)
const getPageMouseY = computed(() => store.getPageMouseY)
</script>

<template>
  <div class="debug">
    {{ getPageWidth }} / {{ getPageHeight }} / {{ getPageScrollY }} /
    {{ getPageMouseX }} / {{ getPageMouseY }}
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.debug {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: $z-debug;
  padding-right: 15px;
  padding-left: 15px;
  font-weight: bold;
  color: $color-blue;
  background-color: rgba($color-white, 0.5);

  @include tablet {
    //
  }
}
</style>
