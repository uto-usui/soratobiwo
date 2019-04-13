<template>
  <Wrapper class="profile" :get-page-ready="getPageReady">
    <MainOuter>
      <HeroSub
        :image="require('Images/hero/item2.jpg')"
        :title="`profile`"
        :get-page-ready="getPageReady"
      />
      <MainInner>
        <div
          v-for="(item, index) in profileData"
          :key="`profileSection${index}`"
          class="profile__section"
        >
          <h2 class="profile__title">
            <div class="profile__title-en" v-text="item.titleEn" />
            <div class="profile__title-ja" v-text="item.titleJa" />
          </h2>
          <div v-if="item.artistImage" class="profile__artist-wrap">
            <img
              :src="require(`Images/${item.artistImage}`)"
              alt="artist image"
              class="profile__artist"
            />
          </div>
          <p v-if="item.text" class="profile__text" v-html="item.text" />
        </div>
      </MainInner>
    </MainOuter>
  </Wrapper>
</template>

<style lang="scss" scoped>
.profile__section {
  font-weight: bold;
  color: $color-white;
  text-align: justify;
  //
  @include desktop {
    padding-left: calc(100vw * 90 / 1024);
  }
  //
  + .profile__section {
    margin-top: calc(100vw * 20 / 375);
    //
    @include desktop {
      margin-top: calc(100vw * 100 / 1024);
    }
  }
}

.profile__title {
  position: relative;
  margin-bottom: 30px;
  //
  @include desktop {
    margin-bottom: calc(100vw * 35 / 1024);
  }
}

.profile__title-en {
  height: 0.85em;
  font-family: $font-Nunito;
  font-size: calc(100vw * 45 / 375);
  font-weight: $font-Nunito-bold;
  color: $color-primary;
  text-align: right;
  text-transform: uppercase;
  mix-blend-mode: multiply;
  //
  @include touch {
    margin-right: calc(100vw * 30 / 375 * -1);
    margin-left: calc(100vw * 30 / 375 * -1);
  }
  //
  @include desktop {
    height: 0.75em;
    margin-left: calc(100vw * 90 / 1024 * -1);
    font-size: calc(100vw * 120 / 1024);
    line-height: 0.85;
    text-align: left;
  }
}

.profile__title-ja {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: calc(100vw * 14 / 375);
  //
  @include desktop {
    font-size: calc(100vw * 14 / 1024);
  }
}

.profile__artist-wrap {
  margin-right: calc(100vw * 30 / 375 * -1);
  margin-bottom: 20px;
  margin-left: calc(100vw * 30 / 375 * -1);
  //
  @include desktop {
    margin-right: calc(100vw * 30 / 1024 * -1);
    margin-bottom: calc(100vw * 35 / 1024);
    margin-left: calc(100vw * 30 / 1024 * -1 + 100vw * 90 / 1024 * -1);
  }
}

.profile__artist {
  //
}

.profile__text {
  position: relative;
  font-size: calc(100vw * 12 / 375);
  line-height: 2;
  //
  @include desktop {
    font-size: calc(100vw * 14 / 1024);
    line-height: 2.5;
  }
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'

import Wrapper from '~/components/layout/Wrapper'
import MainInner from '~/components/MainInner'
import MainOuter from '~/components/MainOuter'
import HeroSub from '~/components/HeroSub'

import profileData from '~/assets/json/profile'

import HeadMixin from '~/mixins/Head'

import { pause } from 'Js/animation'

export default {
  components: {
    Wrapper,
    HeroSub,
    MainOuter,
    MainInner,
  },
  mixins: [HeadMixin],
  data() {
    return {
      profileData,
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
