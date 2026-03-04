<template>
  <img v-lazy="src" :alt="alt" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    },
    alt: {
      type: String,
      default: '',
    },
  },
}
</script>
