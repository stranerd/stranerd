import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(async () => {
	const setDocHeight = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
	window.addEventListener('resize', setDocHeight)
	window.addEventListener('orientationchange', setDocHeight)

	const hasNoGapSupport = () => {
		const { userAgent } = window.navigator
		const keys = ['Intel Mac OS X', 'iPad; CPU OS', 'iPhone OS', 'iPhone; Opera Mini/']
		const index = keys.findIndex((key) => userAgent.includes(key))
		if (index === -1) return false
		const split1 = userAgent.split(keys[index])[1].trim()
		const [majorVersion, minorVersion] = split1.replaceAll('.', '_').split('_')
		const minor = minorVersion.slice(0, 2).trim()
		const version = Number(majorVersion) + (0.1 * Number(minor))
		return version < 14.1
	}
	document.body.setAttribute('data-no-gap', hasNoGapSupport() ? 'true' : 'false')
})
