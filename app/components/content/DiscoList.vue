<script setup lang="ts">
import type { MusicAlbum } from '~/types'

interface Props {
  listData: MusicAlbum[] | null
}

defineProps<Props>()
</script>

<template>
  <ul v-if="listData" class="list-disco">
    <li
      v-for="(item, index) in listData"
      :key="`listItem${index}`"
      class="list-disco__item"
    >
      <ContentListInner :is-link="false">
        <div class="list-disco__inner">
          <div class="list-disco__left">
            <div class="list-disco__figure-wrap">
              <figure
                class="list-disco__figure"
                :style="{ backgroundImage: `url(/images/album/${item.img})` }"
              />
            </div>
            <h2 class="list-disco__title">{{ item.title }}</h2>
            <h3 class="list-disco__subtitle">{{ item.titleSub }}</h3>
            <p v-if="item.fee" class="list-disco__fee" v-html="item.fee" />
            <p v-if="item.text" class="list-disco__text">{{ item.text }}</p>
            <p v-if="item.soldOut" class="list-disco__sold">
              Thank you for sold out !
            </p>
            <p v-if="item.special" class="list-disco__special">
              <NuxtLink :to="`/special/${item.slug}/`">{{ item.special }}</NuxtLink>
            </p>
          </div>
          <div class="list-disco__right">
            <ul class="list-disco__songs">
              <li
                v-for="(_item, _index) in item.songs"
                :key="`song${_index}`"
                class="list-disco__song"
              >{{ _item }}</li>
            </ul>
          </div>
        </div>
      </ContentListInner>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.list-disco {
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

  @include desktop {
    width: calc(100% / 3 - 100vw * 20 / 1024 / 2);
    margin-bottom: calc(100vw * 20 / 1024);
  }

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

  @include touch {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  @include desktop {
    padding: calc(100vw * 10 / 1024);
  }

  @include widescreen {
    padding: calc(100vw * 20 / 1280);
  }
}

.list-disco__left {
  @include touch {
    flex-shrink: 1;
    width: calc(50% - 100vw * 5 / 375);
  }
}

.list-disco__right {
  @include touch {
    flex-shrink: 1;
    width: calc(50% - 100vw * 5 / 375);
  }

  @include desktop {
    margin-top: calc(100vw * 10 / 1024);
  }
}

.list-disco__figure-wrap {
  position: relative;
  padding-top: 50%;
  padding-bottom: 50%;

  @include desktop {
    margin-top: calc(100vw * 10 / 1024 * -1);
    margin-right: calc(100vw * 10 / 1024 * -1);
    margin-left: calc(100vw * 10 / 1024 * -1);
  }

  @include widescreen {
    margin-top: calc(100vw * 20 / 1280 * -1);
    margin-right: calc(100vw * 20 / 1280 * -1);
    margin-left: calc(100vw * 20 / 1280 * -1);
  }
}

.list-disco__figure {
  @include overlay;
  @include bg-cover;
}

.list-disco__title {
  margin-top: calc(100vw * 10 / 375);
  font-size: calc(100vw * 14 / 375);
  line-height: 1.1;

  @include desktop {
    margin-top: calc(100vw * 10 / 1024);
    font-size: calc(100vw * 16 / 1024);
  }

  @include widescreen {
    margin-top: calc(100vw * 15 / 1280);
    font-size: calc(100vw * 16 / 1280);
  }
}

.list-disco__subtitle {
  margin-bottom: calc(100vw * 10 / 375);
  font-size: calc(100vw * 9 / 375);
  color: $color-gray-level2;

  @include desktop {
    margin-bottom: calc(100vw * 10 / 1024);
    font-size: calc(100vw * 11 / 1024);
  }

  @include widescreen {
    margin-bottom: calc(100vw * 15 / 1280);
    font-size: calc(100vw * 11 / 1280);
  }
}

.list-disco__fee {
  font-size: calc(100vw * 9 / 375);

  @include desktop {
    font-size: calc(100vw * 12 / 1024);
  }

  @include widescreen {
    font-size: calc(100vw * 12 / 1280);
  }
}

.list-disco__text {
  font-size: calc(100vw * 9 / 375);

  @include desktop {
    font-size: calc(100vw * 12 / 1024);
  }

  @include widescreen {
    font-size: calc(100vw * 12 / 1280);
  }
}

.list-disco__sold {
  font-size: calc(100vw * 9 / 375);
  color: $color-red;

  @include desktop {
    font-size: calc(100vw * 12 / 1024);
  }

  @include widescreen {
    font-size: calc(100vw * 12 / 1280);
  }
}

.list-disco__special {
  margin-top: calc(100vw * 10 / 375);
  margin-bottom: calc(100vw * 10 / 375);
  font-size: calc(100vw * 9 / 375);

  @include desktop {
    margin-top: calc(100vw * 10 / 1024);
    margin-bottom: calc(100vw * 10 / 1024);
    font-size: calc(100vw * 12 / 1024);
  }

  @include widescreen {
    margin-top: calc(100vw * 15 / 1280);
    margin-bottom: calc(100vw * 15 / 1280);
    font-size: calc(100vw * 12 / 1280);
  }

  a {
    color: inherit;
    border-bottom: 2px solid currentColor;

    &:hover {
      color: $color-gray-level1;
      background-color: $color-white;
    }
  }
}

.list-disco__songs {
  font-size: calc(100vw * 10 / 375);

  @include desktop {
    font-size: calc(100vw * 12 / 1024);
  }

  @include widescreen {
    font-size: calc(100vw * 12 / 1280);
  }
}

.list-disco__song {
  //
}
</style>
