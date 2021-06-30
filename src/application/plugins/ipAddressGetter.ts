import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { AxiosInstance } from '@modules/core/services/http'
import { useAuth } from '@app/hooks/auth/auth'

export default defineNuxtPlugin(async () => {
	try {
		const res = await AxiosInstance.get('https://extreme-ip-lookup.com/json/', {
			withCredentials: false
		})
		const {
			query: ip,
			city, region: state, country, countryCode, continent,
			lat: latitude, lon: longitude
		} = res.data
		useAuth().setUserLocation({
			ip, latitude, longitude,
			city, state, country, countryCode, continent
		})
	} catch (err) {}
})
