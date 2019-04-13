<template>
  <ul class="list-disco">
    <li
      v-for="(item, index) in listData"
      :key="`listItem${index}`"
      class="list-disco__item"
    >
      <ListInner :is-link="false">
        <div class="list-disco__inner">
          <div class="list-disco__left">
            <div class="list-disco__figure-wrap">
              <figure
                v-lazy:background-image="require(`Images/album/${item.img}`)"
                class="list-disco__figure"
              ></figure>
            </div>
            <h2 class="list-disco__title" v-text="item.title" />
            <h3 class="list-disco__subtitle" v-text="item.titleSub" />
            <p v-if="item.fee" class="list-disco__fee" v-text="item.fee" />
            <p v-if="item.text" class="list-disco__text" v-text="item.text" />
            <p v-if="item.soldOut" class="list-disco__sold">
              thanks to sold out !
            </p>
          </div>
          <div class="list-disco__right">
            <ul class="list-disco__songs">
              <li
                v-for="(_item, _index) in item.songs"
                :key="`song${_index}`"
                class="list-disco__song"
                v-text="_item"
              />
            </ul>
          </div>
        </div>
      </ListInner>
    </li>
  </ul>
</template>

<script>
import ListInner from '~/components/ListInner'

import dateMixin from '~/mixins/Date'

export default {
  name: 'DiscoList',
  components: { ListInner },
  mixins: [dateMixin],
  props: {
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
.list-disco {
  //
  @include desktop {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: calc(100vw * 15 / 1024 * -1);
  }
}

.list-disco__item {
  color: $color-white;
  background-color: $color-gray-level1;
  border: 5px solid currentColor;
  //
  @include desktop {
    width: calc(100% / 3 - 100vw * 20 / 1024 / 2);
    margin-bottom: calc(100vw * 20 / 1024);
  }
  //
  + .list-disco__item {
    @include touch {
      margin-top: calc(100vw * 20 / 375);
    }
  }
}

.list-disco__inner {
  font-weight: bold;
  line-height: 1.5;
  text-align: left;
  //
  @include touch {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  //
  @include desktop {
    padding: calc(100vw * 10 / 1024);
  }
  //
  @include widescreen {
    padding: calc(100vw * 20 / 1280);
  }
}

.list-disco__left {
  //
  @include touch {
    flex-shrink: 1;
    width: calc(50% - 100vw * 5 / 375);
  }
}

.list-disco__right {
  //
  @include touch {
    flex-shrink: 1;
    width: calc(50% - 100vw * 5 / 375);
  }
  //
  @include desktop {
    margin-top: calc(100vw * 10 / 1024);
  }
}

.list-disco__figure-wrap {
  position: relative;
  padding-top: 50%;
  padding-bottom: 50%;
  //
  @include desktop {
    margin-top: calc(100vw * 10 / 1024 * -1);
    margin-right: calc(100vw * 10 / 1024 * -1);
    margin-left: calc(100vw * 10 / 1024 * -1);
  }
  //
  @include widescreen {
    margin-top: calc(100vw * 20 / 1280 * -1);
    margin-right: calc(100vw * 20 / 1280 * -1);
    margin-left: calc(100vw * 20 / 1280 * -1);
  }
}

.list-disco__figure {
  //
  @include overlay;
  @include bg-cover;
}

.list-disco__title {
  margin-top: calc(100vw * 10 / 375);
  font-size: calc(100vw * 14 / 375);
  line-height: 1.1;
  //
  @include desktop {
    margin-top: calc(100vw * 10 / 1024);
    font-size: calc(100vw * 16 / 1024);
  }
  //
  @include widescreen {
    margin-top: calc(100vw * 15 / 1280);
    font-size: calc(100vw * 16 / 1280);
  }
}

.list-disco__subtitle {
  margin-bottom: calc(100vw * 10 / 375);
  font-size: calc(100vw * 9 / 375);
  color: $color-gray-level2;
  //
  @include desktop {
    margin-bottom: calc(100vw * 10 / 1024);
    font-size: calc(100vw * 11 / 1024);
  }
  //
  @include widescreen {
    margin-bottom: calc(100vw * 15 / 1280);
    font-size: calc(100vw * 11 / 1280);
  }
}

.list-disco__fee {
  font-size: calc(100vw * 9 / 375);
  //
  @include desktop {
    font-size: calc(100vw * 12 / 1024);
  }
  //
  @include widescreen {
    font-size: calc(100vw * 12 / 1280);
  }
}

.list-disco__text {
  font-size: calc(100vw * 9 / 375);
  //
  @include desktop {
    font-size: calc(100vw * 12 / 1024);
  }
  //
  @include widescreen {
    font-size: calc(100vw * 12 / 1280);
  }
}

.list-disco__sold {
  font-size: calc(100vw * 9 / 375);
  color: $color-red;
  //
  @include desktop {
    font-size: calc(100vw * 12 / 1024);
  }
  //
  @include widescreen {
    font-size: calc(100vw * 12 / 1280);
  }
}

.list-disco__songs {
  font-size: calc(100vw * 10 / 375);
  //
  @include desktop {
    font-size: calc(100vw * 12 / 1024);
  }
  //
  @include widescreen {
    font-size: calc(100vw * 12 / 1280);
  }
}

.list-disco__song {
  //
}
</style>
