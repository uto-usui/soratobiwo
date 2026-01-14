// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

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

  // グローバルCSS（Phase 2完了後に有効化）
  // css: ['~/assets/sass/main.scss'],

  // SCSS変数・mixinのグローバル注入（Phase 2完了後に有効化）
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          // additionalData: `
          //   @use "~/assets/sass/foundation/variable/_variable.scss" as *;
          //   @use "~/assets/sass/foundation/mixin/_mixin.scss" as *;
          // `,
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
})
