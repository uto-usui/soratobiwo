<template>
  <div class="thanks">
    <div class="">
      <h1 class="thanks__title">thanks !</h1>
      <p class="thanks__link-wrap">
        <a href="../" class="thanks__link">go to home -></a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.thanks {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.thanks__title {
  margin-bottom: 15px;
  font-family: $font-Nunito;
  font-size: 10vw;
  font-weight: $font-Nunito-bold;
  color: $color-gray-level1;
  text-transform: uppercase;
}

.thanks__link {
  font-size: 5vw;
  font-weight: $font-Nunito-bold;
  color: $color-gray-level1;
  text-transform: uppercase;
  border-bottom: 5px solid currentColor;
  //
  @include desktop {
    font-size: 3vw;
  }
}
</style>

<script>
import { mapActions } from 'vuex'
import { pause } from 'Js/animation'
import HeadMixin from '~/mixins/Head'

export default {
  components: {
    //
  },
  mixins: [HeadMixin],
  data() {
    return {
      title: 'thanks',
    }
  },
  mounted() {
    this.$nextTick(async () => {
      await pause(1)
      this.setPageReady(true)
    })
  },
  methods: {
    ...mapActions(['setPageReady']),
  },
}
</script>
