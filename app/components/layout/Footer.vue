<script setup lang="ts">
// Footer component
</script>

<template>
  <footer class="footer">
    <p class="copyright">
      &copy; soratobiwo
    </p>
  </footer>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.footer {
  float: left;
  width: 100%;
  padding: 0 0 20px 0;
  text-align: center;
  background-color: #fff;

  ul {
    margin-bottom: 8px;
  }

  li {
    display: inline-block;
    margin: 0 8px;
  }
}

.copyright {
  font-size: 1rem;
  color: #4d4d4d;
  text-align: center;
}
</style>
