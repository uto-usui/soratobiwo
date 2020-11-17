<template>
  <Wrapper :get-page-ready="getPageReady" class="follow">
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

import { pause } from 'Js/animation'
import Wrapper from '~/components/layout/Wrapper'
import MainInner from '~/components/MainInner'
import MainOuter from '~/components/MainOuter'
import HeroSub from '~/components/HeroSub'
import FollowList from '~/components/FollowList'

import followData from '~/assets/json/follow'

import HeadMixin from '~/mixins/Head'

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
