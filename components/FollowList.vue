<template>
  <ul class="list-follow">
    <li
      v-for="(item, index) in listData"
      :key="`listItem${index}`"
      class="list-follow__item"
    >
      <ListInner :is-link="false">
        <div class="list-follow__item-inner">
          <div class="list-follow__names-wrap">
            <ul class="list-follow__names">
              <li
                v-for="(_item, _index) in item.items"
                :key="_index"
                class="list-follow__name"
              >
                <a
                  :href="_item.link"
                  target="_blank"
                  class="list-follow__target"
                  v-html="_item.name"
                ></a>
              </li>
            </ul>
          </div>
          <div class="list-follow__logo">
            <SocialLogos :name="item.name[0]"></SocialLogos>
          </div>
        </div>
      </ListInner>
    </li>
  </ul>
</template>

<script>
import ListInner from '~/components/ListInner'
import SocialLogos from '~/components/SocialLogos'

import dateMixin from '~/mixins/Date'

export default {
  name: 'List',
  components: { ListInner, SocialLogos },
  mixins: [dateMixin],
  props: {
    getPageReady: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    listData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      //
    }
  },
  computed: {
    //
  },
  created() {
    //
  },
  mounted() {
    this.$nextTick(() => {
      //
    })
  },
  methods: {
    //
  },
}
</script>

<style lang="scss" scoped>
.list-follow {
  //
  @include desktop {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: calc(100vw * 15 / 1024 * -1);
  }
}

.list-follow__item {
  color: $color-white;
  background-color: $color-gray-level1;
  border: 5px solid currentColor;
  //
  @include desktop {
    width: calc(100% / 3 - 100vw * 20 / 1024 / 2);
    margin-bottom: calc(100vw * 20 / 1024);
  }
  //
  + .list-follow__item {
    @include touch {
      margin-top: calc(100vw * 20 / 375);
    }
  }
}

.list-follow__item-inner {
  position: relative;
  z-index: 9;
  width: 100%;
  //
  @include touch {
    height: 0;
    padding-top: calc(50% / 16 * 9);
    padding-bottom: calc(50% / 16 * 9);
  }
  //
  @include desktop {
    height: calc(100vh / 3 * 2);
  }
}

.list-follow__names-wrap {
  z-index: 9;
  //
  @include overlay;
}

.list-follow__names {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: -1.5em;
  //
  @include desktop {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh / 3 * 2);
  }
}

.list-follow__name {
  flex-shrink: 1;
  width: 50%;
  height: auto;
  margin-bottom: 1.5em;
  font-size: 1.2rem;
  font-weight: $font-Ubuntu-bold;
  text-align: left;
  white-space: nowrap;
  //
  @include desktop {
    width: 100%;
    font-size: 1.6rem;
    text-align: center;
    //
  }
}

.list-follow__target {
  color: $color-white;
  border-bottom: 2px solid currentColor;
}

.list-follow__logo {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  mix-blend-mode: multiply;
  opacity: 0.2;
  transform: translate(-50%, -50%);
}
</style>
