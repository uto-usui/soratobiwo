<template>
  <div class="contact">
    <p class="contact__text">
      cont<span>a</span>ct
    </p>
    <div class="contact__bar" />
  </div>
</template>

<script>
export default {
  name: 'Contact',
}
</script>

<style lang="scss" scoped>
.contact {
  position: fixed;
  right: 0;
  bottom: 50px;
  left: 0;
  z-index: $z-contact;
  //
  @include desktop {
    bottom: calc(100vw * 30 / 1024);
  }
}

.contact__text {
  font-size: 3.4rem;
  font-weight: $font-Ubuntu-bold;
  line-height: 0.75;
  color: $color-gray-level1;
  text-align: right;
  text-transform: uppercase;
  //
  @include desktop {
    font-size: calc(100vw * 36 / 1024);
  }
  //
  span {
    color: $color-red;
  }
}

.contact__bar {
  height: 10px;
  background-color: $color-gray-level1;
}
</style>
