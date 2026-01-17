<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import specialJson from '~/assets/json/special.json'

const store = useMainStore()
const route = useRoute()

// Get the ID from the route params
const id = computed(() => {
  const param = route.params.id
  return Array.isArray(param) ? param[0] : param
})

// Find the special page by ID
const special = computed(() => {
  return specialJson.find((item) => `${item.id}` === id.value)
})

// 404 if not found
if (!special.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Special page not found',
  })
}

// SEO
usePageSeo({
  title: `${special.value?.name || 'Special'}|soratobiwo`,
})

// Page loading transition
usePageLoading()
</script>

<template>
  <div class="page-special">
    <template v-if="special">
      <!-- TODO: Add HeroSub component in Phase 5 -->
      <div class="placeholder-hero-sub">
        <h1>{{ special.name }}</h1>
      </div>

      <div class="special-content">
        <div
          v-for="(item, index) in special.items"
          :key="`item-${index}`"
          class="special-item"
        >
          <h2 v-if="item.title" class="item-title">{{ item.title }}</h2>
          <div v-if="item.image" class="item-image">
            <img :src="`/images/${item.image}`" :alt="item.title || ''" />
          </div>
          <div v-if="item.texts" class="item-texts">
            <p v-for="(text, textIndex) in item.texts" :key="`text-${textIndex}`" v-html="text"></p>
          </div>
        </div>
      </div>

      <div class="special-back">
        <NuxtLink to="/" class="back-link">
          &larr; Back to Home
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.page-special {
  min-height: 100vh;
  padding-top: 100px;
}

.placeholder-hero-sub {
  text-align: center;
  padding: 4rem 2rem;
  color: $color-white;

  h1 {
    font-size: 2.5rem;
    letter-spacing: 0.1em;
  }
}

.special-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: $color-white;
}

.special-item {
  margin-bottom: 3rem;
}

.item-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.item-image {
  margin-bottom: 1rem;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
}

.item-texts {
  line-height: 1.8;

  p {
    margin-bottom: 1rem;
  }
}

.special-back {
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
