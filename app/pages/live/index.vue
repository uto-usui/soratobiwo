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
  <div class="page-live">
    <!-- TODO: Add HeroSub component in Phase 5 -->
    <div class="placeholder-hero-sub">
      <h1>LIVE</h1>
    </div>

    <div class="live-list">
      <div v-for="live in liveData" :key="live.id" class="live-item">
        <NuxtLink :to="`/live/${live.id}`" class="live-link">
          <span class="live-date">{{ live.date.split('T')[0] }}</span>
          <span class="live-title">{{ live.title }}</span>
          <span class="live-place">{{ live.place }}</span>
        </NuxtLink>
      </div>
      <p v-if="liveData.length === 0" class="no-events">
        現在予定されているライブはありません
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-live {
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

.live-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.live-item {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba($color-white, 0.2);
  padding-bottom: 1.5rem;
}

.live-link {
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

.live-date {
  font-size: 0.875rem;
  opacity: 0.7;
}

.live-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.live-place {
  font-size: 0.875rem;
  opacity: 0.7;
}

.no-events {
  text-align: center;
  color: $color-white;
  opacity: 0.7;
}
</style>
