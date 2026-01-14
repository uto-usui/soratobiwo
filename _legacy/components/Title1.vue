<template>
  <h2 class="title1">
    <div class="title1__outer">
      <div
        ref="text"
        :class="{ 'is-show': show }"
        v-html="text"
        class="title1__inner"
      />
    </div>
  </h2>
</template>

<script>
import WrapSpan from 'Js/wrapSpan'

export default {
  name: 'Title1',
  props: {
    text: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // show: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.wrapSpan()
    })
  },
  methods: {
    stepEnterHandler() {
      this.show = true
    },
    wrapSpan() {
      // eslint-disable-next-line no-new
      new WrapSpan(this.$refs.text, 0.05)
    },
  },
}
</script>

<style lang="scss" scoped>
.title1 {
  margin-bottom: -0.1em;
  font-size: 4rem;
  line-height: calc(1em * 72 / 80);
  text-align: left;
  //
  @include desktop {
    font-size: 5rem;
  }
  //
  &.title1--twitter {
    //
    @include desktop {
      font-size: 4.5rem;
    }
    //
    @include widescreen {
      font-size: 5rem;
    }
  }
  //
  /deep/ br {
    //
    @include desktop {
      display: none;
    }
  }
}

.title1__inner {
  perspective: 800px;
  transform-style: preserve-3d;
  pointer-events: none;
  //
  /deep/ span {
    will-change: transform;
    transition: transform 1s $easeInOutSine;
    transform: scale(0) rotateY(-30deg);
    //
    @include desktop {
      transform: scale(0) translateY(50%) translateX(0) translateZ(0)
        rotateY(-90deg) rotateX(-45deg);
      transform-origin: bottom right;
    }
  }
  //
  &.is-show {
    //
    /deep/ span {
      transform: scale(1) rotateY(0);
      //
      @include desktop {
        transform: scale(1) translateY(0) translateX(0) translateZ(0) rotateY(0)
          rotateX(0);
      }
    }
  }
}
</style>
