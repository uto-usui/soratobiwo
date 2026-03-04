<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import followJson from '~/assets/json/follow.json'

const store = useMainStore()
const { getPageReady } = storeToRefs(store)

// Follow data
const followData = followJson

// SEO
usePageSeo({
  title: 'follow|soratobiwo',
})

// Page loading transition
usePageLoading()
</script>

<template>
  <LayoutWrapper :get-page-ready="getPageReady" class="follow">
    <ContentMainOuter>
      <ContentHeroSub
        image="/images/2026/image15.webp"
        title="follow"
        :get-page-ready="getPageReady"
      />
      <ContentMainInner>
        <ContentFollowList :list-data="followData" />
      </ContentMainInner>
    </ContentMainOuter>
  </LayoutWrapper>
</template>
