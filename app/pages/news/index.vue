<script setup lang="ts">
import { useMainStore } from '~/stores/main'

const store = useMainStore()
const { pageReady } = storeToRefs(store)

// JSON は書き出し時にだけ読み、ページの payload には一覧で使う項目だけを入れる
const { data: newsData } = await useAsyncData('news-list', async () => {
  const { default: all } = await import('~/assets/json/news.json')
  return all.map((item) => pick(item, ['id', 'title', 'date', 'hero', 'heroSrcset', 'wp']))
})

// SEO
usePageSeo({
  title: 'news|soratobiwo',
})

// Page loading transition
usePageLoading()
</script>

<template>
  <LayoutWrapper :get-page-ready="pageReady" class="live">
    <ContentMainOuter class="live">
      <ContentHeroSub image="/images/2026/image19.webp" title="news" :get-page-ready="pageReady" />
      <ContentMainInner>
        <ContentList :list-data="newsData" />
      </ContentMainInner>
    </ContentMainOuter>
  </LayoutWrapper>
</template>
