<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import newsJson from '~/assets/json/news.json'

const store = useMainStore()
const { getPageReady } = storeToRefs(store)

// News data
const newsData = newsJson

// SEO
usePageSeo({
  title: 'news|soratobiwo',
})

// Page loading transition
usePageLoading()
</script>

<template>
  <LayoutWrapper :get-page-ready="getPageReady" class="live">
    <ContentMainOuter class="live">
      <ContentHeroSub
        image="/images/2026/image19.webp"
        title="news"
        :get-page-ready="getPageReady"
      />
      <ContentMainInner>
        <ContentList :list-data="newsData" />
      </ContentMainInner>
    </ContentMainOuter>
  </LayoutWrapper>
</template>
