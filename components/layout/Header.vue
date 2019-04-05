<template>
  <header
    :class="[{'is-open': getMenuOpen}]"
    class="header"
  >
    header
  </header>
</template>

<script>
export default {
  components: {
    //
  },
  props: {
    getPageHeight: {
      type: Number,
      default: 0,
    },
    getPageScrollY: {
      type: Number,
      default: 0,
    },
    getMenuOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //
    }
  },
  computed: {
    //
  },
  mounted() {
    this.$nextTick(() => {
      //
    })
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: $z-header;
  //
  color: $color-blue;
  //
  @include desktop {
    transition: color 0.25s $easeInOutSine;
    //
    &.is-open {
      color: $color-blue;
      transition: color 0.75s 0.25s $easeInOutSine;
    }

    &.is-comic {
      color: $color-blue;
    }
  }
}
</style>
