import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(async () => {
	const setDocHeight = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
	window.addEventListener('resize', setDocHeight)
	window.addEventListener('orientationchange', setDocHeight)

	const hasNoGapSupport = () => {
		const { userAgent } = window.navigator
		const keys = ['Intel Mac OS X', 'iPad; CPU OS', 'iPhone OS', 'iPhone; Opera Mini/']
		const index = keys.findIndex((key) => userAgent.includes(key))
		return index !== -1
	}
	document.body.setAttribute('data-no-gap', hasNoGapSupport() ? 'true' : 'false')
})
