<template>
  <div :class="[{ 'is-full': full }]" class="button-target">
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TweenMax, Sine, Power1 } from 'gsap'
import { distance } from 'Js/math'

export default {
  name: 'ButtonTarget',
  props: {
    full: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rect: {},
      // マウスとオブジェクトの距離
      dist: 0,
      // 移動距離
      distMove: 0,
      // スタートの閾値
      threshold: 50,
      // 終わりの閾値
      thresholdDist: 60,
      // 座標
      center: {
        x: 0,
        y: 0,
      },
      // 移動が始まる直前のオブジェクトの座標をキャッシュ
      centerCache: {
        x: 0,
        y: 0,
      },
      isMove: false,
      isAnimation: false,
    }
  },
  computed: {
    ...mapGetters(['getPageMouseX', 'getPageMouseY']),
  },
  watch: {
    /**
     * マウス座標を監視して .5px 以上動いたらインタラクションさせる
     * @param newValue
     * @param oldValue
     * @return {boolean}
     */
    getPageMouseX(newValue, oldValue) {
      if (!this.$ua.isFromPc() && Math.abs(oldValue - newValue) < 0.5) {
        return false
      } else {
        this.$ua.isFromPc() && this.checkPosition()
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.$el.getBoundingClientRect())
    })
  },
  methods: {
    checkPosition() {
      this.rect = this.$el.getBoundingClientRect()

      // インタラクションする前に キャッシュを作っておく
      if (!this.isMove) {
        this.centerCache = {
          x: this.rect.left + this.rect.width / 2,
          y: this.rect.top + this.rect.height / 2,
        }
      }

      this.center.x = this.rect.left + this.rect.width / 2
      this.center.y = this.rect.top + this.rect.height / 2

      this.dist = distance(
        this.center.x,
        this.center.y,
        this.getPageMouseX,
        this.getPageMouseY,
      )
      if (Math.abs(this.dist) < this.threshold) {
        this.start()
      } else {
        this.out()
      }
      // console.log(this.dist)
    },
    start() {
      this.isMove = true

      const dist = distance(
        this.center.x,
        this.center.y,
        this.centerCache.x,
        this.centerCache.y,
      )

      if (Math.abs(dist) > this.thresholdDist) {
        this.out()
      } else {
        this.in(
          this.getPageMouseX - this.center.x,
          this.getPageMouseY - this.center.y,
        )
      }

      // console.log('move')
    },
    out() {
      TweenMax.to(this.$el, 0.4, {
        x: 0,
        y: 0,
        scale: 1,
        ease: Sine.easeOut,
        onComplete: () => {
          this.isMove = false
        },
      })
    },
    in(x, y) {
      TweenMax.to(this.$el, 0.8, {
        x: x,
        y: y,
        scale: 1.05,
        ease: Power1.easeOut,
        // onComplete: () => {
        //   console.log(this)
        // },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.button-target {
  display: inline-block;
  //
  &.is-full {
    width: 100%;
  }
}
</style>
