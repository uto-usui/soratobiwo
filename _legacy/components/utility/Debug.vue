<template>
  <div class="debug">
    {{ getPageWidth }} / {{ getPageHeight }} / {{ getPageScrollY }} /
    {{ getPageMouseX }} / {{ getPageMouseY }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { FpsCalculator } from 'Js/FpsCalculator'

export default {
  name: 'Debug',
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapGetters([
      'getPageHeight',
      'getPageWidth',
      'getPageScrollY',
      'getPageMouseX',
      'getPageMouseY',
      'getDocumentHeight',
    ]),
  },
  watch: {
    getPageReady(value) {
      console.log('🙆🏻‍♀️ getPageReady', value)
    },
  },
  mounted() {
    this.fpsCalc()
  },
  methods: {
    fpsCalc() {
      const fps = new FpsCalculator()
      fps.start()
    },
  },
}
</script>

<style lang="scss" scoped>
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
  //
  @include tablet {
    //
  }
}
</style>
