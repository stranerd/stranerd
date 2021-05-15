import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(async () => {
	const setDocHeight = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
	window.addEventListener('resize', setDocHeight)
	window.addEventListener('orientationchange', setDocHeight)

	const hasGapSupport = () => {
		const flex = document.createElement('div')
		flex.style.display = 'flex'
		flex.style.flexDirection = 'column'
		flex.style.position = 'absolute'
		flex.style.rowGap = '1px'
		flex.appendChild(document.createElement('div'))
		flex.appendChild(document.createElement('div'))
		document.body.appendChild(flex)
		const isSupported = flex.scrollHeight === 1
		flex.parentNode?.removeChild(flex)
		return isSupported
	}
	document.body.setAttribute('data-gap', hasGapSupport() ? 'true' : 'false')
})
