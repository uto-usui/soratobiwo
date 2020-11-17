<template>
  <Wrapper :get-page-ready="getPageReady" class="live">
    <MainOuter class="live">
      <HeroSub
        :image="require('Images/2020/6.jpg')"
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

import { pause } from 'Js/animation'
import Wrapper from '~/components/layout/Wrapper'
import MainInner from '~/components/MainInner'
import MainOuter from '~/components/MainOuter'
import HeroSub from '~/components/HeroSub'
import List from '~/components/List'

import liveJson from '~/assets/json/live'

import HeadMixin from '~/mixins/Head'

const liveData = liveJson.filter(el => new Date(el.date) > new Date()).reverse()

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
      await pause(0.1)
      this.setPageReady(true)
    })
  },
  methods: {
    ...mapActions(['setPageReady']),
  },
}
</script>
