<template>
  <Wrapper :get-page-ready="getPageReady" class="live">
    <MainOuter>
      <MainInner>
        <Article :get-is-desktop="getIsDesktop" :post="post" />
        <ArticleBottom
          :image="post.wp ? post.hero : require(`Images/${post.hero}`)"
        />
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

import Article from '~/components/Article'
import ArticleBottom from '~/components/ArticleBottom'

import HeadMixin from '~/mixins/Head'
import liveData from '~/assets/json/live'

export default {
  components: {
    Wrapper,
    MainInner,
    MainOuter,
    Article,
    ArticleBottom,
  },
  mixins: [HeadMixin],
  data() {
    return {
      post: {},
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
      'getIsDesktop',
    ]),
  },
  asyncData({ params }) {
    const post = liveData.find(post => `${post.id}` === params.id)

    if (post) {
      return {
        post,
        desc: post.act + post.time + post.fee,
        ogImg: post.wp ? post.hero : require(`Images/${post.hero}`),
        title: post.title + '|soratobiwo',
      }
    } else {
      return { statusCode: 404, message: 'Post not found' }
    }
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
