<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import liveJson from '~/assets/json/live.json'

const store = useMainStore()

// Filter future live events and reverse order (latest first)
const liveData = computed(() => {
  return liveJson.filter((el) => new Date(el.date) > new Date()).reverse()
})

// SEO
usePageSeo({
  title: 'live|soratobiwo',
})

// Page loading transition
usePageLoading()
</script>

<template>
  <LayoutWrapper :get-page-ready="store.pageReady" class="live">
    <ContentMainOuter>
      <ContentHeroSub
        image="/images/2026/image10.webp"
        title="live"
        :get-page-ready="store.pageReady"
      />
      <ContentMainInner>
        <ContentList :list-data="liveData" />
        <NuxtLink to="/live/archive/" class="archive-link">
          過去のライブはこちら →
        </NuxtLink>
      </ContentMainInner>
    </ContentMainOuter>
  </LayoutWrapper>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.archive-link {
  display: block;
  margin-top: calc(100vw * 30 / 375);
  font-family: $font-sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: bold;
  color: $color-white;
  text-align: right;
  transition: color 0.3s ease;

  &:hover {
    color: $color-primary;
  }

  @include desktop {
    margin-top: calc(100vw * 30 / 1024);
    font-size: calc(100vw * 14 / 1024);
  }
}
</style>
