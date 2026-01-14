<template>
  <Wrapper :get-page-ready="getPageReady" class="listen">
    <MainOuter>
      <HeroSub
        :image="require('Images/2020/5.jpg')"
        :title="`listen`"
        :get-page-ready="getPageReady"
      />
      <MainInner>
        <div class="listen__list">
          <FollowList :list-data="listenData" />
        </div>
        <div class="listen__list">
          <DiscoList :list-data="musicData" />
        </div>
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
import DiscoList from '~/components/DiscoList'

import listenData from '~/assets/json/listen'
import musicData from '~/assets/json/music'

import HeadMixin from '~/mixins/Head'

export default {
  components: {
    Wrapper,
    HeroSub,
    FollowList,
    DiscoList,
    MainInner,
    MainOuter,
  },
  mixins: [HeadMixin],
  data() {
    return {
      listenData,
      musicData,
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

<style lang="scss" scoped>
.listen__list {
  //
  + .listen__list {
    margin-top: calc(100vw * 20 / 375);
    //
    @include desktop {
      margin-top: calc(100vw * 30 / 1024);
    }
  }
}
</style>
