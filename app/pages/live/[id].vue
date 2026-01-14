<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import liveData from '~/assets/json/live.json'

const store = useMainStore()
const route = useRoute()

// Get the ID from the route params
const id = computed(() => {
  const param = route.params.id
  return Array.isArray(param) ? param[0] : param
})

// Find the live event by ID
const live = computed(() => {
  return liveData.find((item) => item.id === id.value)
})

// 404 if not found
if (!live.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Live event not found',
  })
}

// SEO
usePageSeo({
  title: `${live.value?.title || 'Live'}|soratobiwo`,
  description: `${live.value?.act || ''} ${live.value?.time || ''} ${live.value?.fee || ''}`,
  ogImage: live.value?.wp ? live.value?.hero : undefined,
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
  <div class="page-live-detail">
    <template v-if="live">
      <div class="live-hero">
        <img
          v-if="live.hero"
          :src="live.wp ? live.hero : `/images/${live.hero}`"
          :alt="live.title"
          class="live-hero-image"
        />
      </div>

      <article class="live-content">
        <h1 class="live-title">{{ live.title }}</h1>

        <div class="live-meta">
          <p class="live-date">{{ live.date.split('T')[0] }}</p>
          <p class="live-place">{{ live.place }}</p>
        </div>

        <div class="live-details">
          <dl v-if="live.time">
            <dt>TIME</dt>
            <dd>{{ live.time }}</dd>
          </dl>
          <dl v-if="live.act">
            <dt>ACT</dt>
            <dd>{{ live.act }}</dd>
          </dl>
          <dl v-if="live.fee">
            <dt>TICKET</dt>
            <dd>{{ live.fee }}</dd>
          </dl>
        </div>

        <div v-if="live.info && live.info.length" class="live-info">
          <p
            v-for="(info, index) in live.info"
            :key="index"
            v-html="info"
          ></p>
        </div>

        <div v-if="live.soldOut" class="live-soldout">
          SOLD OUT
        </div>
      </article>

      <div class="live-back">
        <NuxtLink to="/live" class="back-link">
          &larr; Back to Live List
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.page-live-detail {
  min-height: 100vh;
  padding-top: 80px;
}

.live-hero {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.live-hero-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.live-content {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 2rem;
  color: $color-white;
}

.live-title {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.live-meta {
  margin-bottom: 2rem;
  opacity: 0.8;

  p {
    margin-bottom: 0.25rem;
  }
}

.live-details {
  margin-bottom: 2rem;

  dl {
    display: flex;
    margin-bottom: 0.5rem;
  }

  dt {
    width: 80px;
    font-weight: bold;
    flex-shrink: 0;
  }

  dd {
    flex: 1;
  }
}

.live-info {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba($color-white, 0.1);
  border-radius: 4px;

  p {
    margin-bottom: 0.75rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(a) {
    color: $color-primary;
    text-decoration: underline;
  }
}

.live-soldout {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: $color-red;
  color: $color-white;
  font-weight: bold;
  border-radius: 4px;
}

.live-back {
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
