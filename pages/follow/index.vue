<template>
  <Wrapper class="follow" :get-page-ready="getPageReady">
    <MainOuter>
      <HeroSub
        :image="require('Images/2020/4.jpg')"
        :title="`follow`"
        :get-page-ready="getPageReady"
      />
      <MainInner>
        <FollowList :list-data="followData" />
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

import followData from '~/assets/json/follow'

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
      followData,
      title: 'follow|soratobiwo',
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
