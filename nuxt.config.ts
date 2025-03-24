// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
  ],

  imports: { dirs: ['queries/*.ts'] },

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      nasaApiKey: '',
    },
  },

  future: { compatibilityVersion: 4 },

  compatibilityDate: '2024-11-27',

  eslint: { config: { stylistic: true } },

  shadcn: { prefix: 'Ui' },
})