<template>
  <div
    :class="[{'is-open': getMenuOpen}]"
    class="fixed-content"
  >
    <Logo />
    <Frame />
    <Contact />
    <Copy />
    <News />

    <Header
      :get-menu-open="getMenuOpen"
      :get-page-height="getPageHeight"
      :get-page-scroll-y="getPageScrollY"
    />
    <Menu
      :get-menu-open="getMenuOpen"
    />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
import Menu from '~/components/layout/Menu'
import Frame from '~/components/layout/Frame'
import Logo from '@/components/layout/Logo'
import Contact from '@/components/layout/Contact'
import Copy from '@/components/layout/Copy'
import News from '@/components/layout/News'

export default {
  components: {
    News,
    Copy,
    Contact,
    Logo,
    Frame,
    Header,
    Menu,
    Footer,
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
.fixed-content {
  //
}
</style>
