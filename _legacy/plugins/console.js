import Vue from 'vue'

/**
 * テンプレート内で console.log するための拡張
 * {{$console($store.state)}}
 */
Vue.mixin({
  methods: {
    $console(...args) {
      console.dir(args)
    },
  },
})
