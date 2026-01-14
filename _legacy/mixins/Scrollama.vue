<script>
import scrollama from 'scrollama'

export default {
  mounted() {
    this.$nextTick(() => {
      const scroller = scrollama()
      scroller
        .setup({
          step: this.$el,
          once: true,
          offset: 0.875,
        })
        .onStepEnter(this.stepEnterHandler)
    })
  },
}
</script>
