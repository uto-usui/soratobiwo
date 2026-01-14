<script setup lang="ts">
import { useMainStore } from '~/stores/main'

const store = useMainStore()

// Use thanks layout
definePageMeta({
  layout: 'thanks',
})

// SEO
usePageSeo({
  title: 'thanks|soratobiwo',
})

// Set page ready after mount
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    store.setPageReady(true)
  }, 1000)
})

// Reset page ready on unmount
onBeforeUnmount(() => {
  store.setPageReady(false)
})
</script>

<template>
  <div class="thanks">
    <div class="thanks-content">
      <h1 class="thanks-title">thanks !</h1>
      <p class="thanks-link-wrap">
        <NuxtLink to="/" class="thanks-link">go to home -&gt;</NuxtLink>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.thanks {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.thanks-content {
  text-align: center;
}

.thanks-title {
  margin-bottom: 15px;
  font-family: $font-Nunito;
  font-size: 10vw;
  font-weight: $font-Nunito-bold;
  color: $color-gray-level1;
  text-transform: uppercase;
}

.thanks-link {
  font-size: 5vw;
  font-weight: $font-Nunito-bold;
  color: $color-gray-level1;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 5px solid currentColor;

  @include desktop {
    font-size: 3vw;
  }
}
</style>
