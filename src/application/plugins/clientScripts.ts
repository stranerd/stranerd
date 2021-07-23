import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import Vue from 'vue'
// @ts-ignore
import Flutterwave from 'flutterwave-vue-v3'
import { flutterwaveConfig } from '@utils/environment'
// @ts-ignore
import Donut from 'vue-css-donut-chart'
import 'vue-css-donut-chart/dist/vcdonut.css'

export default defineNuxtPlugin(async () => {
	const hasNoGapSupport = () => {
		const flex = document.createElement('div')
		flex.style.display = 'flex'
		flex.style.flexDirection = 'column'
		flex.style.rowGap = '1px'
		flex.appendChild(document.createElement('div'))
		flex.appendChild(document.createElement('div'))
		document.body.appendChild(flex)
		const hasSupport = flex.scrollHeight === 1
		flex.parentNode?.removeChild(flex)
		return !hasSupport
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
	Vue.use(Donut)
})
