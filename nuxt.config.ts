import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxt/eslint", "@vite-pwa/nuxt"],
  eslint: {},
  css: ['~/assets/css/style.css'],
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/', // questo è ciò che genera createHandlerBoundToURL
    },
    manifest: {
      name: 'Azul score calculator',
      short_name: 'Azul',
      start_url: '/',
      display: 'standalone',
      background_color: '#3366cc',
      theme_color: '#63A2B0',
    },
  }
});
