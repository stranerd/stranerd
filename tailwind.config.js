module.exports = {
	purge: [
		'./src/**/*.{vue,js}',
		'./nuxt.config.{js,ts}'
	],
	mode: 'jit',
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: '#546DD3',
				text_link: '#546DD2',
				secondary: '#132740',
				primary_dark: '#374B99',
				button_text: '#374B99',
				heading: '#374B98'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp')
	]
}
