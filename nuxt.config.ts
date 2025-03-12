// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/fonts',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      title: '✨ P_o_s_t_s app ✨',
    },
  },

  css: ['~/assets/css/main.css'],

  eslint: {
    config: {
      stylistic: true,
      typescript: true,
    },
  },

  colorMode: {
    preference: 'light',
  },
})
