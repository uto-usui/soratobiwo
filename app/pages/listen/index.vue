<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import listenJson from '~/assets/json/listen.json'
import musicJson from '~/assets/json/music.json'

const store = useMainStore()
const { getPageReady } = storeToRefs(store)

// Data
const listenData = listenJson
const musicData = musicJson

// SEO
usePageSeo({
  title: 'listen|soratobiwo',
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
  <LayoutWrapper :get-page-ready="getPageReady" class="listen">
    <ContentMainOuter>
      <ContentHeroSub
        image="/images/2020/5.jpg"
        title="listen"
        :get-page-ready="getPageReady"
      />
      <ContentMainInner>
        <div class="listen__list">
          <ContentFollowList :list-data="listenData" />
        </div>
        <div class="listen__list">
          <ContentDiscoList :list-data="musicData" />
        </div>
      </ContentMainInner>
    </ContentMainOuter>
  </LayoutWrapper>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.listen__list {
  + .listen__list {
    margin-top: calc(100vw * 20 / 375);

    @include desktop {
      margin-top: calc(100vw * 30 / 1024);
    }
  }
}
</style>
