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
        <ContentTimeline :list-data="liveArchiveJson" />
      </ContentMainInner>
    </ContentMainOuter>
  </LayoutWrapper>
</template>
