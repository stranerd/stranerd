const path = require('path')

module.exports = {
	srcDir: 'src/application',
	buildDir: 'build',
	telemetry: false,
	server: {
		port: process.env.PORT || 8080
	},
	target: 'server',
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	css: [
		'@/assets/styles/index.scss'
	],
	styleResources: {
		scss: [
			'@/assets/styles/variables.scss'
		]
	},
	serverMiddleware: [
		'@@/src/server/api/index'
	],
	plugins: [
		{ mode: 'server', src: '@/plugins/parseLoggedInUser' },
		{ mode: 'client', src: '@/plugins/firebaseClient' },
		{ mode: 'client', src: '@/plugins/registerClientScripts' }
	],
	components: true,
	modules: [
		'@nuxtjs/style-resources'
	],
	buildModules: [
		'@nuxtjs/composition-api', '@nuxt/typescript-build', 'nuxt-purgecss',
		['nuxt-compress', { gzip: { cache: true }, brotli: { threshold: 10240 } }],
		['@nuxtjs/router', { keepDefaultRouter: true, fileName: 'router.js' }]
	],
	env: { ...process.env },
	subDomains: {
		paths: ['auth', 'admin'],
		root: 'root'
	},
	generate: {
		interval: 5000
	},
	build: {
		extend: (config) => {
			config.node = { fs: 'empty' }
			config.resolve.alias['@app'] = path.join(__dirname, 'src/application')
			config.resolve.alias['@modules'] = path.join(__dirname, 'src/modules')
			config.resolve.alias['@utils'] = path.join(__dirname, 'src/utils')
		}
	},
	typescript: {
		typeCheck: {
			eslint: {
				files: 'src/**/*.{ts,js,vue}'
			}
		}
	},
	render: {
		bundleRenderer: {
			runInNewContext: false
		}
	}
}
