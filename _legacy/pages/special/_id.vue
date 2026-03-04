<template>
  <Wrapper :get-page-ready="getPageReady" class="special">
    <MainOuter class="special">
      <HeroSub
        :image="require(`Images/album/${post.name}.jpg`)"
        :title="`${post.name}`"
        :get-page-ready="getPageReady"
      />
      <MainInner>
        <Post v-for="(item, index) in post.items" :key="`post${index}`">
          <Title2 :item="item" />
          <postImage :image="item.image" />
          <PostText
            v-for="(_item, _index) in item.texts"
            :key="`postTexts${_index}`"
            :text="_item"
          />
        </Post>
        <div class="special__bottom-img">
          <postImage :image="`album/${post.name}.jpg`" />
        </div>
      </MainInner>
    </MainOuter>
  </Wrapper>
</template>

<style lang="scss" scoped>
.special__bottom-img {
  margin-top: calc(100vw * 20 / 375);
  //
  @include desktop {
    margin-top: calc(100vw * 100 / 1024);
  }
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'

import { pause } from 'Js/animation'
import Wrapper from '~/components/layout/Wrapper'
import MainInner from '~/components/MainInner'
import MainOuter from '~/components/MainOuter'
import HeroSub from '~/components/HeroSub'
import Title2 from '~/components/Title2'
import Post from '~/components/Post'
import PostImage from '~/components/PostImage'
import PostText from '~/components/PostText'

import specialJson from '~/assets/json/special'

import HeadMixin from '~/mixins/Head'

export default {
  components: {
    PostImage,
    PostText,
    Wrapper,
    HeroSub,
    MainInner,
    MainOuter,
    Title2,
    Post,
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
    ]),
  },
  asyncData({ params }) {
    const post = specialJson.find(post => `${post.id}` === params.id)

    if (post) {
      return {
        post,
        ogImg: post.wp ? post.name : require(`Images/album/${post.name}.jpg`),
        title: post.name + '|soratobiwo',
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
