<template>
  <Wrapper class="live" :get-page-ready="getPageReady">
    <MainOuter class="live">
      <HeroSub
        :image="`https://soratobiwo.com/wp-content/uploads/2019/04/6_11.jpg`"
        :title="`live`"
        :get-page-ready="getPageReady"
      />
      <MainInner>
        <List :list-data="liveData" />
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
import List from '~/components/List'

import liveData from '~/assets/json/live'

import HeadMixin from '~/mixins/Head'

import { pause } from 'Js/animation'

export default {
  components: {
    Wrapper,
    HeroSub,
    List,
    MainInner,
    MainOuter,
  },
  mixins: [HeadMixin],
  data() {
    return {
      liveData,
      title: 'live|soratobiwo',
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
