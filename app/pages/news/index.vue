<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import newsJson from '~/assets/json/news.json'

const store = useMainStore()

// News data (already sorted by date in JSON)
const newsData = newsJson

// SEO
usePageSeo({
  title: 'news|soratobiwo',
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
  <div class="page-news">
    <!-- TODO: Add HeroSub component in Phase 5 -->
    <div class="placeholder-hero-sub">
      <h1>NEWS</h1>
    </div>

    <div class="news-list">
      <div v-for="news in newsData" :key="news.id" class="news-item">
        <NuxtLink :to="`/news/${news.id}`" class="news-link">
          <span class="news-date">{{ news.date.split('T')[0] }}</span>
          <span class="news-title">{{ news.title }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-news {
  min-height: 100vh;
  padding-top: 100px;
}

.placeholder-hero-sub {
  text-align: center;
  padding: 4rem 2rem;
  color: $color-white;

  h1 {
    font-size: 3rem;
    letter-spacing: 0.2em;
  }
}

.news-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.news-item {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba($color-white, 0.2);
  padding-bottom: 1.5rem;
}

.news-link {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: $color-white;
  text-decoration: none;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
}

.news-date {
  font-size: 0.875rem;
  opacity: 0.7;
}

.news-title {
  font-size: 1.125rem;
}
</style>
