// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // アプリ設定
  app: {
    head: {
      // Critical CSS to prevent FOUC (Flash of Unstyled Content)
      // Hide all content initially, Vue will show it when ready
      style: [
        {
          children: `
            /* Hide content until Vue hydrates and adds is-ready class */
            .body:not(.is-ready) .fixed-content,
            .body:not(.is-ready) .wrapper,
            .body:not(.is-ready) [class^="page-"] {
              opacity: 0 !important;
              pointer-events: none !important;
            }
            /* Fallback: hide #__nuxt children until CSS loads */
            #__nuxt > div:not(.body) {
              opacity: 0;
            }
          `,
        },
      ],
      // Add class to body element for additional control
      bodyAttrs: {
        class: 'loading',
      },
    },
  },

  // モジュール
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/fonts',
  ],

  // Google Fonts をビルド時に取得して自前で配信する（描画を止める外部 CSS をなくすため）
  fonts: {
    defaults: {
      styles: ['normal', 'italic'],
    },
    families: [
      { name: 'Nunito', provider: 'google', weights: [400, 800] },
      { name: 'Ubuntu', provider: 'google', weights: [400, 700] },
    ],
  },

  // 表示されたリンクを先読みすると、初回表示中の画像と回線を取り合うため、操作されたときだけ先読みする
  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: { visibility: false, interaction: true },
      },
    },
  },

  // TypeScript
  typescript: {
    strict: true,
  },

  // Viteエイリアス設定
  alias: {
    'Sass': '~/assets/sass',
    'Js': '~/assets/js',
    'Images': '~/assets/images',
  },

  // グローバルCSS
  css: ['~/assets/sass/main.scss'],

  // SCSS変数・mixinのグローバル注入
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
            @use "~/assets/sass/foundation/variable/variable" as *;
            @use "~/assets/sass/foundation/mixin/mixin" as *;
          `,
        },
      },
    },
  },

  // SSG設定
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },

  // 動的ルート生成フック
  hooks: {
    async 'prerender:routes'(ctx) {
      // live.json からルート生成
      const liveData = await import('./app/assets/json/live.json', { with: { type: 'json' } })
      for (const item of liveData.default) {
        ctx.routes.add(`/live/${item.id}`)
      }

      // アーカイブページ
      ctx.routes.add('/live/archive')

      // news.json からルート生成
      const newsData = await import('./app/assets/json/news.json', { with: { type: 'json' } })
      for (const item of newsData.default) {
        ctx.routes.add(`/news/${item.id}`)
      }
    },
  },
})
