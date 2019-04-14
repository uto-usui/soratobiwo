<template>
  <div :class="[{ 'is-open': getFormOpen }]" class="form">
    <div class="form__inner">
      <form
        name="contact"
        method="POST"
        action="/thanks/"
        netlify
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <input name="bot-field" type="hidden" />
        <div class="form__area">
          <p class="form__item">
            <label class="form__label"
              >お名前
              <input class="form__input" type="text" name="name" required
            /></label>
          </p>
          <p class="form__item">
            <label class="form__label"
              >Email
              <input class="form__input" type="email" name="email" required
            /></label>
          </p>
          <p class="form__item">
            <label class="form__label"
              >ご用件
              <select class="form__input" name="role">
                <option value="--" v-text="`--`" />
                <option
                  v-for="(_item, _index) in roleData"
                  :key="`role${_index}`"
                  :value="_item"
                  v-text="_item"
                /> </select
            ></label>
          </p>
          <p class="form__item">
            <label class="form__label"
              >イベント会場
              <select class="form__input" name="event">
                <option value="--" v-text="`--`" />
                <option
                  v-for="(item, index) in liveData.filter(
                    el => new Date(el.date) > new Date(),
                  )"
                  :key="`event${index}`"
                  :value="`${getDate(item.date)} ${item.place}`"
                  v-text="`${getDate(item.date)} ${item.place}`"
                /> </select
            ></label>
          </p>
          <p class="form__item">
            <label class="form__label"
              >チケット枚数
              <input class="form__input" type="number" name="number"
            /></label>
          </p>
          <p class="form__item">
            <label class="form__label"
              >メッセージ
              <textarea
                class="form__input form__input--ms"
                name="message"
              ></textarea
            ></label>
          </p>
          <p class="form__item form__item--button">
            <button class="form__button" type="submit">Send mail</button>
          </p>
        </div>
      </form>
    </div>
    <div class="form__close" @click.prevent="setFormOpen(false)">
      <ButtonClose />
    </div>
  </div>
</template>

<script>
import ButtonClose from '~/components/ButtonClose'

import liveJson from '~/assets/json/live'
import Date from '~/mixins/Date'
import { mapGetters, mapActions } from 'vuex'

const liveData = [...liveJson].filter(el => el.soldOut !== true).reverse()

export default {
  name: 'FormContent',
  components: { ButtonClose },
  mixins: [Date],
  data() {
    return {
      liveData,
      roleData: ['ライブ予約', 'ライブオファー', 'メッセージ'],
    }
  },
  computed: {
    ...mapGetters(['getFormOpen']),
  },
  methods: {
    ...mapActions(['setFormOpen']),
  },
}
</script>

<style lang="scss" scoped>
.form {
  position: fixed;
  top: calc(100vw * 20 / 375);
  right: calc(100vw * 20 / 375);
  bottom: calc(50px + 10px);
  left: 0;
  z-index: $z-form-bg;
  pointer-events: none;
  background-color: rgba($color-gray-level2, 1);
  opacity: 0;
  //
  @include desktop {
    top: calc(100vw * 30 / 1024);
    right: calc(100vw * 30 / 1024);
    bottom: calc(100vw * 30 / 1024 + 10px);
  }
  //
  @include widescreen {
    top: calc(100vw * 30 / 1280);
    right: calc(100vw * 30 / 1280);
    bottom: calc(100vw * 30 / 1280 + 10px);
  }
  //
  &.is-open {
    pointer-events: auto;
    opacity: 1;
  }
}

.form__inner {
  padding: calc(100vw * 30 / 375);
  //
  @include desktop {
    padding: calc(100vw * 30 / 1024);
  }
}

.form__area {
  //
  @include desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: -30px;
  }
}

.form__close {
  position: absolute;
  bottom: 0;
  left: 0;
}

.form__item {
  text-align: left;
  //
  @include desktop {
    width: calc(50% - 100vw * 10 / 1024);
    margin-bottom: 30px;
  }
  //
  + .form__item {
    @include touch {
      margin-top: 15px;
    }
  }
  //
  &--button {
    text-align: right;
  }
}

.form__label {
  display: block;
  width: 100%;
  font-size: 1.4rem;
  font-weight: bold;
  color: $color-gray-level1;
  //
  @include desktop {
    font-size: 1.6rem;
  }
}

.form__input {
  display: inline-block;
  width: 100%;
  height: 40px;
  padding-top: calc((40px - 0.75em * 2) / 2);
  padding-right: 0.75em;
  padding-bottom: calc((40px - 0.75em * 2) / 2);
  padding-left: 0.75em;
  font-size: 1.6rem;
  color: $color-gray-level1;
  border: 5px solid currentColor;
  //
  @include desktop {
    height: 50px;
    padding-top: calc((50px - 0.75em * 2) / 2);
    padding-bottom: calc((50px - 0.75em * 2) / 2);
  }
  //
  &--ms {
    height: 5em;
  }
}

.form__button {
  height: 40px;
  padding-top: calc((40px - 0.75em * 2) / 2);
  padding-right: 0.75em;
  padding-bottom: calc((40px - 0.75em * 2) / 2);
  padding-left: 0.75em;
  font-weight: bold;
  color: $color-gray-level1;
  text-transform: uppercase;
  border: 5px solid currentColor;
}
</style>
