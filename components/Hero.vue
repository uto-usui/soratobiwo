<template>
  <div
    class="hero"
  >
    hero
  </div>
</template>

<script>
export default {
  name: 'Hero',
  components: {},
  props: {
    getPageReady: {
      type: Boolean,
      default: false,
    },
    getPageHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      videoSelected: false,
      height: '',
    }
  },
  computed: {
    //
  },
  created() {
    //
  },
  mounted() {
    this.$nextTick(() => {
      //
    })
  },
  methods: {
    //
  },
}
</script>

<style lang="scss" scoped>
.hero {
  //
}
</style>
