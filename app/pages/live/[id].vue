<script setup lang="ts">
import { useMainStore } from '~/stores/main'

const store = useMainStore()
const { pageReady } = storeToRefs(store)
const route = useRoute()

// Get the ID from the route params
const id = computed(() => {
  const param = route.params.id
  return Array.isArray(param) ? param[0] : param
})

// JSON は書き出し時にだけ読み、ページの payload にはこの 1 件だけを入れる
const { data: post } = await useAsyncData(`live-${id.value}`, async () => {
  const { default: all } = await import('~/assets/json/live.json')
  return all.find((item) => item.id === id.value) ?? null
})

// 404 if not found
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Live event not found',
  })
}

// SEO
usePageSeo({
  title: `${post.value?.title || 'Live'}|soratobiwo`,
  description: `${post.value?.act || ''} ${post.value?.time || ''} ${post.value?.fee || ''}`,
  ogImage: post.value?.wp ? post.value?.hero : undefined,
})

// Page loading transition
usePageLoading()
</script>

<template>
  <LayoutWrapper :get-page-ready="pageReady" class="live">
    <ContentMainOuter>
      <ContentMainInner>
        <template v-if="post">
          <ContentArticle :post="post" />
          <ContentArticleBottom
            :image="post.wp ? post.hero : `/images/${post.hero}`"
            :srcset="post.heroSrcset"
          />
        </template>
      </ContentMainInner>
    </ContentMainOuter>
  </LayoutWrapper>
</template>
