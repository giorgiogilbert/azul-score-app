export default defineNuxtConfig({
  modules: ['@nuxtjs/pwa'],
  pwa: {
    manifest: {
      name: 'Azul Score App',
      short_name: 'AzulScore',
      theme_color: '#2a4365',
      background_color: '#f7fafc',
      display: 'standalone'
    },
    registerType: 'autoUpdate'
  },
  test: {
    environment: 'jsdom'
  }
})
