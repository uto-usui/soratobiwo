<template>
  <Wrapper class="live" :get-page-ready="getPageReady">
    <MainOuter>
      <MainInner>
        <Article :get-is-desktop="getIsDesktop" :post="post" />
        <ArticleBottom :image="require(`Images/${post.hero}`)" />
      </MainInner>
    </MainOuter>
  </Wrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Wrapper from '~/components/layout/Wrapper'
import MainInner from '~/components/MainInner'
import MainOuter from '~/components/MainOuter'

import Article from '~/components/Article'
import ArticleBottom from '~/components/ArticleBottom'

import HeadMixin from '~/mixins/Head'
import newsData from '~/assets/json/news'

import { pause } from 'Js/animation'

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
    const post = newsData.find(post => `${post.id}` === params.id)

    if (post) {
      return {
        post,
        ogImg: post.hero + '|soratobiwo',
        title: post.title,
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
