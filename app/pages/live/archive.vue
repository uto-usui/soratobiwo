<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import liveArchiveJson from '~/assets/json/liveArchive.json'

const store = useMainStore()

// SEO
usePageSeo({
  title: 'live archive|soratobiwo',
})

// Page loading transition
usePageLoading()
</script>

<template>
  <LayoutWrapper :get-page-ready="store.pageReady" class="live-archive">
    <ContentMainOuter>
      <ContentHeroSub
        image="/images/2026/image10.webp"
        title="archive"
        :get-page-ready="store.pageReady"
      />
      <ContentMainInner>
        <NuxtLink to="/live/" class="live-link">
          ← これからのライブはこちら
        </NuxtLink>
        <ContentTimeline :list-data="liveArchiveJson" />
      </ContentMainInner>
    </ContentMainOuter>
  </LayoutWrapper>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.live-link {
  display: block;
  margin-bottom: calc(100vw * 30 / 375);
  font-family: $font-sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: bold;
  color: $color-white;
  transition: color 0.3s ease;

  &:hover {
    color: $color-primary;
  }

  @include desktop {
    margin-bottom: calc(100vw * 30 / 1024);
    font-size: calc(100vw * 14 / 1024);
  }
}
</style>
