<template>
  <div
    :class="[{'is-ready': getPageReady}, {'is-ie': $ua.browser() === 'Internet Explorer'}]"
    class="wrapper"
  >
    <Loader
      :get-page-ready="getPageReady"
    />
    <Header
      :get-menu-open="getMenuOpen"
      :get-page-height="getPageHeight"
      :get-page-scroll-y="getPageScrollY"
    />
    <Menu
      :get-menu-open="getMenuOpen"
    />
    <nuxt />
    <Footer v-show="getHeroReady" />
    <Debug v-if="false" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
import Menu from '~/components/layout/Menu'
import Loader from '~/components/layout/Loader'
import Debug from '~/components/utility/Debug'
import data from '~/assets/js/data'

export default {
  components: {
    Loader,
    Header,
    Menu,
    Footer,
    Debug,
  },
  computed: {
    ...mapGetters([
      'getPageReady',
      'getVideoReady',
      'getPostReady',
      'getIsVideoAndPageReady',
      'getHeroReady',

      'getPageHeight',
      'getPageWidth',
      'getPageScrollY',

      'getMenuOpen',

      'getPageName',
    ]),
  },
  mounted() {
    this.$nextTick(() => {
      data.init()
      this.setPageData(data)
    })
  },
  methods: {
    ...mapActions(['setPageData']),
  },
}
</script>

<style lang="scss">
@import '~Sass/foundation/_reset';
@import '~Sass/foundation/base/_base';
@import '~Sass/animation/_keyframes';
@import '~Sass/object/utility/_utility';

@font-face {
  font-family: 'MyYuGothicM';
  font-weight: normal;
  src: local('YuGothic-Medium'), local('Yu Gothic Medium'),
    local('YuGothic-Regular');
}

@font-face {
  font-family: 'MyYuGothicM';
  font-weight: bold;
  src: local('YuGothic-Bold'), local('Yu Gothic');
}
</style>
