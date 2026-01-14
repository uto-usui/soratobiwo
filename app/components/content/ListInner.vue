<script setup lang="ts">
interface Props {
  isLink?: boolean
  slug?: string
}

withDefaults(defineProps<Props>(), {
  isLink: false,
  slug: '',
})

const route = useRoute()
const routeName = computed(() => route.name?.toString().split('-')[0] || '')
</script>

<template>
  <span>
    <NuxtLink
      v-if="isLink"
      :to="`/${routeName}/${slug}/`"
      class="list-inner"
    >
      <slot />
    </NuxtLink>
    <div v-else class="list-inner">
      <slot />
    </div>
  </span>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.list-inner {
  display: block;
  color: inherit;

  @include touch {
    padding: calc(100vw * 25 / 375) calc(100vw * 25 / 375)
      calc(100vw * 25 / 375);
  }
}
</style>
