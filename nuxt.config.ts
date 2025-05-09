import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    ssr: false,
    modules: ["@nuxt/eslint", "@vite-pwa/nuxt","@nuxtjs/i18n"],
    eslint: {},
    css: ['~/assets/css/style.css'],
    i18n: {
        locales: [
            { code: 'it', iso: 'it-IT', name: 'Italiano', file: 'it.json' },
            { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
        ],
        defaultLocale: 'en',
        lazy: false,
        langDir: 'locales/',
        strategy: 'prefix_except_default',
    },
    pwa: {
        registerType: 'autoUpdate',
        workbox: {
            navigateFallback: '/', // questo è ciò che genera createHandlerBoundToURL
        },
        manifest: {
            name: 'Azul score calculator',
            short_name: 'Azul',
            description: 'Azul score calculator',
            start_url: '/',
            display: 'standalone',
            background_color: '#3366cc',
            theme_color: '#63A2B0',
            orientation: 'portrait',
            icons: [
                {
                    src: '/pwa-icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '/pwa-icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
            ],
            screenshots: [
                {
                    "src": "screenshots/screen1.jpg",
                    "sizes": "360x640",
                    "type": "image/jpeg",
                    "form_factor": "wide",
                    "label": ""
                },
                {
                    "src": "screenshots/screen2.jpg",
                    "sizes": "360x640",
                    "type": "image/jpeg",
                    "label": ""
                }
            ]
        },
    }
});
