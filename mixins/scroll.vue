<script>
import { pause } from 'Js/animation'
import { norm } from 'Js/math'

import BezierEasing from 'bezier-easing'

/**
 * 0 ~ 1 の進捗率の値(時間)を与えると ベジェイージングした 0 ~ 1 の値を返す
 * @type {bezier.EasingFunction}
 */
const easing = BezierEasing(0.78, 0.07, 0, 1)

export default {
  props: {
    getPageHeight: {
      type: Number,
      default: 0,
    },
    getPageScrollY: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      scrollReq: null,
      scrollTargetPos: 0,
      scrollFinalPos: 0,
      currentScrollY: 0,
      startTime: 0,
      currentTime: 0,
      duration: 1750,
    }
  },
  methods: {
    // (t, b, c, d)
    easing(currentTime, start, end, duration) {
      let time = currentTime
      time /= duration / 2
      if (time < 1) return (-end / 2) * (Math.sqrt(1 - time * time) - 1) + start
      time -= 2
      return (end / 2) * (Math.sqrt(1 - time * time) + 1) + start
    },
    scrollFunc() {
      this.currentScrollY = this.getPageScrollY
      this.scrollFinalPos = this.getPageHeight - this.currentScrollY
      this.startTime = new Date()
      this.scrollAnim()
    },
    scrollAnim() {
      this.currentTime = new Date() - this.startTime

      const targetCoef = easing(norm(0, this.duration, this.currentTime))
      this.scrollTargetPos =
        this.scrollFinalPos * targetCoef + this.currentScrollY
      const pos = this.$ua.isFromPc() ? 62 : 53
      scrollTo(0, this.scrollTargetPos - pos)
      this.scrollReq = requestAnimationFrame(() => this.scrollAnim())

      this.currentTime > this.duration && this.scrollEnd()
    },
    async scrollEnd() {
      cancelAnimationFrame(this.scrollReq)
      const pos = this.$ua.isFromPc() ? 62 : 53
      scrollTo(0, this.scrollTargetPos - pos)

      await pause(1)

      this.scrollTargetPos = 0
      this.scrollFinalPos = 0
      this.currentScrollY = 0
      this.currentTime = 0
    },
  },
}
</script>
