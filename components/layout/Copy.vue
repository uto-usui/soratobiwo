<template>
  <div class="copy">
    <div class="copy__circle">
      c
    </div>
    <small class="copy__text">soratobiwo.com</small>
  </div>
</template>

<script>
export default {
  name: 'Copy',
}
</script>

<style lang="scss" scoped>
.copy {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: $z-copy;
  display: flex;
  align-items: center;
}

.copy__circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw * 20 / 375);
  height: calc(100vw * 20 / 375);
  margin-right: calc(100vw * 8 / 375);
  font-family: $font-Nunito;
  font-size: calc(100vw * 10 / 375);
  color: $color-white;
  background-color: $color-gray-level1;
  border-radius: 50%;
  //
  @include desktop {
    width: calc(100vw * 30 / 1024);
    height: calc(100vw * 30 / 1024);
    margin-right: calc(100vh * 8 / 768);
    font-size: calc(100vh * 14 / 768);
  }
}

.copy__text {
  font-family: $font-Nunito;
  font-size: calc(100vw * 10 / 375);
  font-weight: $font-Nunito-bold;
  color: $color-gray-level1;
  letter-spacing: 0.1em;
  //
  @include desktop {
    font-size: calc(100vh * 12 / 768);
  }
}
</style>
