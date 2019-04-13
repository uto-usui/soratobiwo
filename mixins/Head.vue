<script>
import { pause } from 'Js/animation'

/**
 * default meta
 * @type {{img: string, description: string, title: string, ogType: string}}
 */
const meta = {
  title: '大阪のロックバンド「soratobiwo | ソラトビヲ」のオフィシャルサイト。',
  description:
    '大阪のロックバンド「soratobiwo | ソラトビヲ」のオフィシャルサイト。プロフィール・ライブスケジュール・音源情報・ニュース・ブログなどsoratobiwoの情報が満載です。',
  img: '',
  ogType: 'website',
  keywords: '大阪,バンド,ロックバンド,soratobiwo,ソラトビヲ',
}

export default {
  /**
   * Meta information of each page
   * Insert from data {title, description, ogType}
   */
  head() {
    return {
      title: this.title || meta.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.keywords || meta.keywords,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.desc || meta.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.title || meta.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.desc || meta.description,
        },
        { hid: 'og:locale', name: 'og:locale', content: 'ja_JP' },
        {
          hid: 'og:type',
          name: 'og:type',
          content: this.ogType || meta.ogType,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: '',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.ogImg || meta.img,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title || meta.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.desc || meta.description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: meta.img,
        },
        { hid: 'twitter:site', name: 'twitter:site', content: '@soratobiwo' },
      ],
    }
  },
  //
  /**
   * page transition
   */
  transition: {
    css: false,
    enter(el, done) {
      done()
    },
    async leave(el, done) {
      this.$store.dispatch('setPageReady', false)
      await pause(0.4)
      this.$store.getters.getMenuOpen &&
        this.$store.dispatch('setMenuOpen', false)
      done()
    },
  },
}
</script>
