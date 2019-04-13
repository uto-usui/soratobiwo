<template>
  <Wrapper :get-page-ready="getPageReady">
    <Hero :get-page-ready="getPageReady" :get-page-height="getPageHeight" />
  </Wrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Wrapper from '~/components/layout/Wrapper'
import Hero from '~/components/Hero'
import HeadMixin from '~/mixins/Head'

import { pause } from 'Js/animation'

export default {
  components: {
    Hero,
    Wrapper,
  },
  mixins: [HeadMixin],
  data() {
    return {
      posts: [],
      title: '',
    }
  },
  computed: {
    ...mapGetters([
      'getPageReady',
      'getPageHeight',
      'getPageWidth',
      'getPageScrollY',
      'getMenuOpen',
    ]),
  },
  mounted() {
    this.$nextTick(async () => {
      await pause(1)
      this.setPageReady(true)
    })
  },
  methods: {
    ...mapActions(['setPageReady']),
  },
}
</script>
