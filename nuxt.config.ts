// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@nuxt/image',
    '@nuxtjs/device',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/app/**': { appLayout: 'app', appMiddleware: ['auth'] },
    '/login': { appLayout: 'auth' },
  },

  compatibilityDate: '2026-08-30',

  hub: {
    db: 'sqlite',
    blob: true,
    kv: true,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'always-multiline',
        braceStyle: '1tbs',
      },
    },
  },
})
