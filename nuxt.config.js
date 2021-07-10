import { join } from 'path'

export const srcDir = 'src/application'

export const buildDir = 'build'

export const telemetry = false

export const server = {
	port: process.env.PORT ?? 8080,
	host: '0.0.0.0'
}

export const target = 'server'

export const head = {
	title: 'Stranerd',
	htmlAttrs: {
		lang: 'en'
	},
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
	],
	link: [
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap' }
	]
}

export const css = ['@/assets/styles/index.scss', '@/assets/styles/layouts.scss']

export const styleResources = {
	scss: ['@/assets/styles/globals.scss']
}

export const serverMiddleware = ['./src/server/api/index']

export const plugins = [
	{ mode: 'server', src: '@/plugins/parseLoggedInUser' },
	{ mode: 'client', src: '@/plugins/ipAddressGetter' },
	{ mode: 'client', src: '@/plugins/firebaseClient' },
	{ mode: 'client', src: '@/plugins/clientScripts' }
]

export const components = [
	'@/components',
	{ path: '@/components/core', level: 0 },
	{ path: '@/components/core/states', level: 0 },
	{ path: '@/components/core/modals', level: 0 }
]

export const buildModules = [
	'@nuxtjs/composition-api/module', '@nuxt/typescript-build', '@nuxtjs/pwa',
	'@nuxtjs/style-resources', 'nuxt-purgecss',
	['nuxt-compress', { gzip: { cache: true }, brotli: { threshold: 10240 } }]
]

export const env = { ...process.env }

export const generate = { interval: 5000 }

export const build = {
	extend: (config) => {
		const reg = /\.(png|jpe?g|gif|svg|webp|avif)$/i
		const rule = config.module.rules.find((r) => r.test.toString() === reg.toString())
		if (rule) rule.use[0].options.limit = 1024 * 4
		config.node = { fs: 'empty' }
		config.resolve.alias['@app'] = join(__dirname, 'src/application')
		config.resolve.alias['@modules'] = join(__dirname, 'src/modules')
		config.resolve.alias['@utils'] = join(__dirname, 'src/utils')
	},
	transpile: ['vue-instantsearch', 'instantsearch.js/es']
}

export const router = {
	middleware: ['routeChange']
}

export const typescript = {
	typeCheck: {
		eslint: {
			files: 'src/**/*.{ts,js,vue}'
		}
	}
}

export const render = {
	bundleRenderer: {
		runInNewContext: false
	}
}

export const pwa = {
	icon: {
		source: 'src/application/static/images/icon.png'
	},
	meta: {
		theme_color: '#395C7F',
		ogHost: 'https://stranerd.com',
		ogImage: 'https://stranerd.com/images/banner.jpg',
		twitterCard: 'https://stranerd.com/images/banner.jpg',
		twitterSite: 'https://stranerd.com'
	},
	manifest: {},
	workbox: {
		runtimeCaching: [
			{
				urlPattern: 'https://fonts.googleapis.com/*',
				handler: 'staleWhileRevalidate',
				strategyOptions: { cacheName: 'fonts-stylesheets' }
			},
			{
				urlPattern: 'https://fonts.gstatic.com/*',
				handler: 'cacheFirst',
				strategyOptions: { cacheName: 'fonts' },
				strategyPlugins: [
					{
						use: 'CacheableResponse',
						config: { statuses: [0, 200] }
					},
					{
						use: 'Expiration',
						config: { maxEntries: 50, maxAgeSeconds: 365 * 24 * 60 * 60 }
					}
				]
			},
			{
				urlPattern: 'https://firebasestorage.googleapis.com/*',
				handler: 'cacheFirst',
				strategyOptions: { cacheName: 'storage' },
				strategyPlugins: [
					{
						use: 'CacheableResponse',
						config: { statuses: [0, 200] }
					},
					{
						use: 'Expiration',
						config: { maxEntries: 100, maxAgeSeconds: 14 * 24 * 60 * 60 }
					}
				]
			}
		]
	}
}
