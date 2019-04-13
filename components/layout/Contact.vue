<template>
  <div class="contact">
    <a href="#" class="contact__text" @click.prevent="setFormOpen(true)">
      cont<span>a</span>ct
    </a>
    <div class="contact__bar" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Contact',
  methods: {
    ...mapActions(['setFormOpen']),
  },
}
</script>

<style lang="scss" scoped>
.contact {
  position: fixed;
  right: 0;
  bottom: 50px;
  left: 0;
  z-index: $z-contact;
  line-height: 0.75;
  text-align: right;
  pointer-events: none;
  //
  @include desktop {
    bottom: calc(100vw * 30 / 1024);
  }
  //
  @include widescreen {
    bottom: calc(100vw * 30 / 1280);
  }
}

.contact__text {
  display: inline-block;
  font-size: 3.4rem;
  font-weight: $font-Ubuntu-bold;
  color: $color-gray-level1;
  text-transform: uppercase;
  pointer-events: auto;
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
  position: relative;
  height: 10px;
  background-color: $color-gray-level1;
  //
  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: calc(100vw * 20 / 375);
    content: '';
    background-color: $color-red;
    //
    @include desktop {
      width: calc(100vw * 30 / 1024);
    }
    //
    @include widescreen {
      width: calc(100vw * 30 / 1280);
    }
  }
}
</style>
