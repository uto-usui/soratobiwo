<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import followJson from '~/assets/json/follow.json'

const store = useMainStore()

// Follow data
const followData = followJson

// SEO
usePageSeo({
  title: 'follow|soratobiwo',
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
  <div class="page-follow">
    <!-- TODO: Add HeroSub component in Phase 5 -->
    <div class="placeholder-hero-sub">
      <h1>FOLLOW</h1>
    </div>

    <div class="follow-content">
      <div class="link-list">
        <a
          v-for="(item, index) in followData"
          :key="`follow-${index}`"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          class="link-item"
        >
          {{ item.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-follow {
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

.follow-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.link-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.link-item {
  display: inline-block;
  padding: 1rem 2rem;
  color: $color-white;
  text-decoration: none;
  border: 1px solid rgba($color-white, 0.3);
  border-radius: 4px;
  transition: all 0.3s;
  min-width: 150px;
  text-align: center;

  &:hover {
    background: rgba($color-white, 0.1);
    border-color: $color-white;
  }
}
</style>
