// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  css: ['@/assets/style/main.scss'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // -- Vite 相关配置 --
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 移除自动注入配置，采用显式的 @use 导入实现真正的模块化
        },
      },
    },
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  plugins: [
    '~/plugins/gsap.ts'
  ],

  // 添加字体配置以禁用 Google Fonts
  fonts: {
    providers: {
      google: false,
      googleicons: false
    }
  },

  // TypeScript 配置
  typescript: {
    strict: true
  }
})