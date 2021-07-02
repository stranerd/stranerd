import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import Vue from 'vue'
// @ts-ignore
import Flutterwave from 'flutterwave-vue-v3'
import { flutterwaveConfig } from '@utils/environment'

export default defineNuxtPlugin(async () => {
	const hasNoGapSupport = () => {
		const { userAgent } = window.navigator
		const keys = ['Intel Mac OS X', 'iPad; CPU OS', 'iPhone OS', 'iPhone; Opera Mini/']
		const index = keys.findIndex((key) => userAgent.includes(key))
		return index !== -1
	}

	document.body.setAttribute('data-no-gap', hasNoGapSupport() ? 'true' : 'false')
	document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)

	window.addEventListener('resize', () => {
		document.body.setAttribute('data-no-gap', hasNoGapSupport() ? 'true' : 'false')
		document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
	})
	window.addEventListener('orientationchange', () => {
		document.body.setAttribute('data-no-gap', hasNoGapSupport() ? 'true' : 'false')
		document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
	})

	Vue.use(Flutterwave, { publicKey: flutterwaveConfig.publicKey })
})
