<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import liveJson from '~/assets/json/live.json'

const store = useMainStore()

// Filter future live events and reverse order (latest first)
const liveData = computed(() => {
  return liveJson
    .filter((el) => new Date(el.date) > new Date())
    .reverse()
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
        image="/images/2020/6.jpg"
        title="live"
        :get-page-ready="store.pageReady"
      />
      <ContentMainInner>
        <ContentList :list-data="liveData" />
      </ContentMainInner>
    </ContentMainOuter>
  </LayoutWrapper>
</template>
