<template>
  <Wrapper class="follow" :get-page-ready="getPageReady">
    <MainOuter>
      <HeroSub
        :image="require('Images/hero/item19.jpg')"
        :title="`listen`"
        :get-page-ready="getPageReady"
      />
      <MainInner>
        <FollowList :list-data="listenData" />
      </MainInner>
    </MainOuter>
  </Wrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Wrapper from '~/components/layout/Wrapper'
import MainInner from '~/components/MainInner'
import MainOuter from '~/components/MainOuter'
import HeroSub from '~/components/HeroSub'
import FollowList from '~/components/FollowList'

import listenData from '~/assets/json/listen'

import HeadMixin from '~/mixins/Head'

import { pause } from 'Js/animation'

export default {
  components: {
    Wrapper,
    HeroSub,
    FollowList,
    MainInner,
    MainOuter,
  },
  mixins: [HeadMixin],
  data() {
    return {
      listenData,
      title: 'listen|soratobiwo',
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
      await pause(0.1)
      this.setPageReady(true)
    })
  },
  methods: {
    ...mapActions(['setPageReady']),
  },
}
</script>
