import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import axios from 'axios'
import { useAuth } from '@app/hooks/auth/auth'

export default defineNuxtPlugin(async ({ req }) => {
	if (process.server) {
		const ip = req.socket.remoteAddress
		/* eslint no-console: "off" */
		axios.get(`https://extreme-ip-lookup.com/json/${ip}`).then((res) => {
			const { setUserLocation } = useAuth()
			const locationData = res.data
			setUserLocation(locationData)
		}).catch((err) => {
			console.log(err)
		})
	}
}
)
