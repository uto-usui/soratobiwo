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
      link: [
        // Google Fonts: Nunito & Ubuntu
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,800;1,400;1,800&family=Ubuntu:ital,wght@0,400;0,700;1,400;1,700&display=swap',
        },
      ],
    },
  },

  // モジュール
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
  ],

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
