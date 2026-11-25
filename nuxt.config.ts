// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // アプリ設定
  app: {
    head: {
      // ページ移動でローダーが出ている間（is-ready が外れている間）は中身を隠す
      style: [
        {
          children: `
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
  modules: ['@pinia/nuxt', '@nuxt/fonts'],

  // Google Fonts をビルド時に取得して自前で配信する（描画を止める外部 CSS をなくすため）
  // 斜体は使っていないので normal だけ。欧文は代わりのフォントで描いてから差し替わるのが目立つので、
  // block で届くまで隠し（最長 3 秒）、HTML を読んだ時点で取りに行かせて隠れる時間を短くする
  fonts: {
    defaults: {
      styles: ['normal'],
      preload: { subsets: ['latin'] },
    },
    families: [
      { name: 'Nunito', provider: 'google', weights: [400, 800], display: 'block' },
      { name: 'Ubuntu', provider: 'google', weights: [400, 700], display: 'block' },
    ],
  },

  // TypeScript
  typescript: {
    strict: true,
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
