<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import listenJson from '~/assets/json/listen.json'
import musicJson from '~/assets/json/music.json'

const store = useMainStore()

// Data
const listenData = listenJson
const musicData = musicJson

// SEO
usePageSeo({
  title: 'listen|soratobiwo',
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
  <div class="page-listen">
    <!-- TODO: Add HeroSub component in Phase 5 -->
    <div class="placeholder-hero-sub">
      <h1>LISTEN</h1>
    </div>

    <div class="listen-content">
      <!-- Streaming Links -->
      <section class="listen-section">
        <h2>Streaming</h2>
        <div class="link-list">
          <a
            v-for="(item, index) in listenData"
            :key="`listen-${index}`"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="link-item"
          >
            {{ item.title }}
          </a>
        </div>
      </section>

      <!-- Discography -->
      <section class="listen-section">
        <h2>Discography</h2>
        <div class="disco-list">
          <NuxtLink
            v-for="(item, index) in musicData"
            :key="`music-${index}`"
            :to="`/special/${item.id}`"
            class="disco-item"
          >
            <div class="disco-image">
              <img :src="`/images/album/${item.name}.jpg`" :alt="item.name" />
            </div>
            <div class="disco-info">
              <span class="disco-name">{{ item.name }}</span>
              <span class="disco-type">{{ item.type }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.page-listen {
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

.listen-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.listen-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.5rem;
    color: $color-white;
    margin-bottom: 1.5rem;
    letter-spacing: 0.1em;
  }

  + .listen-section {
    margin-top: calc(100vw * 20 / 375);

    @include desktop {
      margin-top: calc(100vw * 30 / 1024);
    }
  }
}

.link-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.link-item {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  color: $color-white;
  text-decoration: none;
  border: 1px solid rgba($color-white, 0.3);
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    background: rgba($color-white, 0.1);
    border-color: $color-white;
  }
}

.disco-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
}

.disco-item {
  display: block;
  color: $color-white;
  text-decoration: none;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
}

.disco-image {
  margin-bottom: 0.5rem;

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
}

.disco-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.disco-name {
  font-weight: bold;
  font-size: 0.875rem;
}

.disco-type {
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
