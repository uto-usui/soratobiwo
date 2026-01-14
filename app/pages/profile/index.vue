<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import profileJson from '~/assets/json/profile.json'

const store = useMainStore()

// Profile data
const profileData = profileJson

// SEO
usePageSeo({
  title: 'profile|soratobiwo',
})

// Set page ready after mount
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    store.setPageReady(true)
  }, 100)
})

// Reset page ready on unmount
onBeforeUnmount(() => {
  store.setPageReady(false)
})
</script>

<template>
  <div class="page-profile">
    <!-- TODO: Add HeroSub component in Phase 5 -->
    <div class="placeholder-hero-sub">
      <h1>PROFILE</h1>
    </div>

    <div class="profile-content">
      <div
        v-for="(item, index) in profileData"
        :key="`profile-${index}`"
        class="profile-section"
      >
        <h2 v-if="item.title" class="section-title">{{ item.title }}</h2>
        <div v-if="item.artistImage" class="artist-image">
          <img :src="`/images/${item.artistImage}`" alt="artist image" />
        </div>
        <p v-if="item.text" class="section-text" v-html="item.text"></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.page-profile {
  min-height: 100vh;
  padding-top: 100px;
}

.placeholder-hero-sub {
  text-align: center;
  padding: 4rem 2rem;
  color: $color-white;

  h1 {
    font-size: 3rem;
    letter-spacing: 0.2em;
  }
}

.profile-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-section {
  font-weight: bold;
  color: $color-white;
  text-align: justify;

  @include desktop {
    padding-left: calc(100vw * 90 / 1024);
  }

  + .profile-section {
    margin-top: calc(100vw * 20 / 375);

    @include desktop {
      margin-top: calc(100vw * 100 / 1024);
    }
  }
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.artist-image {
  margin-right: calc(100vw * 30 / 375 * -1);
  margin-bottom: 20px;
  margin-left: calc(100vw * 30 / 375 * -1);

  @include desktop {
    margin-right: calc(100vw * 30 / 1024 * -1);
    margin-bottom: calc(100vw * 35 / 1024);
    margin-left: calc(100vw * 30 / 1024 * -1 + 100vw * 90 / 1024 * -1);
  }

  img {
    max-width: 100%;
    height: auto;
  }
}

.section-text {
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
