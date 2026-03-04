<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import newsData from '~/assets/json/news.json'

const store = useMainStore()
const { getPageReady, getIsDesktop } = storeToRefs(store)
const route = useRoute()

// Get the ID from the route params
const id = computed(() => {
  const param = route.params.id
  return Array.isArray(param) ? param[0] : param
})

// Find the news by ID
const post = computed(() => {
  return newsData.find((item) => `${item.id}` === id.value)
})

// 404 if not found
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'News not found',
  })
}

// SEO
usePageSeo({
  title: `${post.value?.title || 'News'}|soratobiwo`,
  ogImage: post.value?.wp ? post.value?.hero : undefined,
})

// Page loading transition
usePageLoading()
</script>

<template>
  <LayoutWrapper :get-page-ready="getPageReady" class="live">
    <ContentMainOuter>
      <ContentMainInner>
        <template v-if="post">
          <ContentArticle :get-is-desktop="getIsDesktop" :post="post" />
          <ContentArticleBottom
            :image="post.wp ? post.hero : `/images/${post.hero}`"
          />
        </template>
      </ContentMainInner>
    </ContentMainOuter>
  </LayoutWrapper>
</template>
