<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import newsData from '~/assets/json/news.json'

const store = useMainStore()
const route = useRoute()

// Get the ID from the route params
const id = computed(() => {
  const param = route.params.id
  return Array.isArray(param) ? param[0] : param
})

// Find the news by ID
const news = computed(() => {
  return newsData.find((item) => `${item.id}` === id.value)
})

// 404 if not found
if (!news.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'News not found',
  })
}

// SEO
usePageSeo({
  title: `${news.value?.title || 'News'}|soratobiwo`,
  ogImage: news.value?.wp ? news.value?.hero : undefined,
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
  <div class="page-news-detail">
    <template v-if="news">
      <div class="news-hero">
        <img
          v-if="news.hero"
          :src="news.wp ? news.hero : `/images/${news.hero}`"
          :alt="news.title"
          class="news-hero-image"
        />
      </div>

      <article class="news-content">
        <h1 class="news-title">{{ news.title }}</h1>

        <div class="news-meta">
          <p class="news-date">{{ news.date.split('T')[0] }}</p>
        </div>

        <div v-if="news.info && news.info.length" class="news-body">
          <p
            v-for="(info, index) in news.info"
            :key="index"
            v-html="info"
          ></p>
        </div>
      </article>

      <div class="news-back">
        <NuxtLink to="/news" class="back-link">
          &larr; Back to News List
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.page-news-detail {
  min-height: 100vh;
  padding-top: 80px;
}

.news-hero {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.news-hero-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.news-content {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 2rem;
  color: $color-white;
}

.news-title {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.news-meta {
  margin-bottom: 2rem;
  opacity: 0.8;
}

.news-body {
  line-height: 1.8;

  p {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(a) {
    color: $color-primary;
    text-decoration: underline;
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
    border-radius: 4px;
  }
}

.news-back {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.back-link {
  color: $color-white;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
}
</style>
