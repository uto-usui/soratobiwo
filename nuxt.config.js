import path from 'path'
import StylelintPlugin from 'stylelint-webpack-plugin'

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '大阪のロックバンド「soratobiwo | ソラトビヲ」のオフィシャルサイト。プロフィール・ライブスケジュール・音源情報・ニュース・ブログなどsoratobiwoの情報が満載です。',
      },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Nunito:400,400i,800,800i|Ubuntu:400,400i,700,700i',
      },
    ],
    script: [
      {
        src:
          'https://cdn.polyfill.io/v2/polyfill.js?features=IntersectionObserver,es6,es7',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/vue-lazyload.client.js',
    '~plugins/console.js',
    '~plugins/vuex-router-sync.js',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-user-agent',
    [
      '@uto-usui/nuxt-google-gtag',
      {
        id: 'UA-75027189-1',
      },
    ],
  ],

  styleResources: {
    scss: [
      '~/assets/sass/foundation/variable/_variable.scss',
      '~/assets/sass/foundation/mixin/_mixin.scss',
    ],
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    splitChunks: {
      layouts: true,
    },

    // babel: {
    //   plugins: ['@babel/plugin-syntax-dynamic-import'],
    // },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
        config.plugins.push(
          new StylelintPlugin({
            files: ['**/*.vue'],
          }),
        )
      }
      // import alias
      config.resolve.alias.Sass = path.resolve(__dirname, './assets/sass/')
      config.resolve.alias.Js = path.resolve(__dirname, './assets/js/')
      config.resolve.alias.Images = path.resolve(__dirname, './assets/images/')
      config.resolve.alias['~'] = path.resolve(__dirname)
      config.resolve.alias['@'] = path.resolve(__dirname)
    },

    /**
     * prefix
     */
    postcss: {
      preset: {
        autoprefixer: {
          grid: true,
        },
      },
    },
  },

  env: {
    nodeEnv: process.env.NODE_ENV,
  },

  generate: {
    routes(callback) {
      const liveData = require('./assets/json/live.json')
      const livePosts = liveData.map(post => `/live/${post.id}`)
      const newsData = require('./assets/json/news.json')
      const newsPosts = newsData.map(post => `/news/${post.id}`)
      callback(null, [...newsPosts, ...livePosts])
    },
  },

  workbox: { cachingExtensions: '~/plugins/workbox-range-request.js' },
}
