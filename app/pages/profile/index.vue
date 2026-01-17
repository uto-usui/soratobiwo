<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import profileJson from '~/assets/json/profile.json'

const store = useMainStore()
const { getPageReady } = storeToRefs(store)

// Profile data
const profileData = profileJson

// SEO
usePageSeo({
  title: 'profile|soratobiwo',
})

// Page loading transition
usePageLoading()
</script>

<template>
  <LayoutWrapper :get-page-ready="getPageReady" class="profile">
    <ContentMainOuter>
      <ContentHeroSub
        image="/images/2020/8.jpg"
        title="profile"
        :get-page-ready="getPageReady"
      />
      <ContentMainInner>
        <div
          v-for="(item, index) in profileData"
          :key="`profileSection${index}`"
          class="profile__section"
        >
          <ContentTitle2 :item="item" />
          <div v-if="item.artistImage" class="profile__artist-wrap">
            <img
              :src="`/images/${item.artistImage}`"
              alt="artist image"
              class="profile__artist"
            />
          </div>
          <p v-if="item.text" class="profile__text" v-html="item.text" />
        </div>
      </ContentMainInner>
    </ContentMainOuter>
  </LayoutWrapper>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.profile__section {
  font-weight: bold;
  color: $color-white;
  text-align: justify;

  @include desktop {
    padding-left: calc(100vw * 90 / 1024);
  }

  + .profile__section {
    margin-top: calc(100vw * 20 / 375);

    @include desktop {
      margin-top: calc(100vw * 100 / 1024);
    }
  }
}

.profile__artist-wrap {
  margin-right: calc(100vw * 30 / 375 * -1);
  margin-bottom: 20px;
  margin-left: calc(100vw * 30 / 375 * -1);

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
  max-width: 550px;
  font-size: 1.2rem;
  line-height: 1.95;

  @include desktop {
    font-size: 1.4rem;
    line-height: 2.25;
  }

  @include fullhd {
    max-width: 650px;
    font-size: 1.6rem;
    line-height: 2.5;
  }
}
</style>
