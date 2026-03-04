<script setup lang="ts">
import type { NewsItem } from '~/types'
import newsJson from '~/assets/json/news.json'

interface Props {
  getMenuOpen?: boolean
  getIsDesktop?: boolean
}

withDefaults(defineProps<Props>(), {
  getMenuOpen: false,
  getIsDesktop: false,
})

const route = useRoute()

const currentYear = new Date().getFullYear()

// Filter news to current year
const newsData = computed<NewsItem[]>(() => {
  return (newsJson as NewsItem[]).filter(item => {
    const itemYear = new Date(item.date).getFullYear()
    return itemYear === currentYear
  })
})

// Counter for cycling through news
const counter = ref(0)

// Current news item
const currentNews = computed(() => {
  return newsData.value[counter.value] || null
})

// Text animation will be handled in Phase 7 (GSAP migration)
// For now, simple text display
const textRef = ref<HTMLElement>()

// Cycle through news items
const counterNext = () => {
  if (counter.value >= newsData.value.length - 1) {
    counter.value = 0
  } else {
    counter.value++
  }
}

// Simple timer for cycling news (animation will be added in Phase 7)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (newsData.value.length > 1) {
    timer = setInterval(() => {
      counterNext()
    }, 5000)
  }
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div
    v-if="newsData.length > 0"
    :class="[
      {
        'is-open': route.fullPath === '/' || getMenuOpen,
        'is-sub': route.fullPath !== '/' && getIsDesktop,
      },
    ]"
    class="news"
  >
    <div class="news__inner">
      <h2 class="news__title">
        <NuxtLink class="news__target" to="/news/">News</NuxtLink>
      </h2>
      <p class="news__text">
        <NuxtLink
          v-if="currentNews"
          ref="textRef"
          :to="`/news/${currentNews.id}/`"
          class="news__target"
        >{{ currentNews.title }}</NuxtLink>
      </p>
    </div>
    <div class="news__bg" />
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.news {
  position: fixed;
  top: calc(100vh * 330 / 667);
  right: calc(100vw * 20 / 375 / 2);
  z-index: $z-contact;
  width: calc(100vw * 166 / 375);
  height: calc(100vw * 94 / 375);
  overflow: hidden;
  color: $color-gray-level1;
  pointer-events: none;
  border: 5px solid currentColor;
  opacity: 0;
  transition: top 0.4s 0.4s $easeInOutSine, right 0.4s 0.4s $easeInOutSine, transform 0.4s 0.4s $easeInOutSine;

  @include desktop {
    top: calc(100vh * 375 / 768);
    right: calc(100vw * 158 / 1024);
    width: calc(100vw * 222 / 1024);
    height: calc(100vw * 124 / 1024);
  }

  @include widescreen {
    top: calc(100vh * 430 / 800);
    right: calc(100vw * 387 / 1280);
    width: calc(100vw * 222 / 1280);
    height: calc(100vw * 124 / 1280);
  }

  &.is-open {
    pointer-events: auto;
    opacity: 1;
  }

  &.is-sub {
    @include desktop {
      top: calc(100vw * 30 / 1024);
      right: calc(100vw / 3);
      pointer-events: auto;
      opacity: 1;
      transform: translateX(100%);
    }

    @include widescreen {
      top: calc(100vw * 30 / 1280);
    }
  }
}

.news__bg {
  z-index: 1;
  background-color: $color-white;

  @include overlay;
}

.news__inner {
  z-index: 2;
  padding: calc(100vw * 5 / 375);

  @include overlay;

  @include desktop {
    padding: calc(100vw * 5 / 1024);
  }
}

.news__title {
  position: absolute;
  right: calc(100vw * 5 / 375);
  bottom: calc(100vw * 5 / 375);
  font-size: 1.4rem;
  font-weight: bold;

  @include desktop {
    right: calc(100vw * 5 / 1024);
    bottom: calc(100vw * 5 / 1024);
    font-size: calc(100vw * 18 / 1024);
  }

  @include widescreen {
    font-size: calc(100vw * 18 / 1280);
  }
}

.news__text {
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 1.35;
  text-align: left;

  @include desktop {
    font-size: calc(100vw * 18 / 1024);
  }

  @include widescreen {
    font-size: calc(100vw * 18 / 1280);
  }
}

.news__target {
  color: inherit;
}
</style>
