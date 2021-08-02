import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { AxiosInstance } from '@modules/core'
import { useAuth } from '@app/hooks/auth/auth'

export default defineNuxtPlugin(async () => {
	try {
		const geopluginApiSite = 'https://ssl.geoplugin.net/json.gp?k=5c113cbeb772aab6'
		const res = await AxiosInstance.get(geopluginApiSite, {
			withCredentials: false
		})
		const {
			geoplugin_query: ip,
			geoplugin_city: city,
			geoplugin_regionName: state,
			geoplugin_regionCode: stateCode,
			geoplugin_countryName: country,
			geoplugin_countryCode: countryCode,
			geoplugin_continentName: continent,
			geoplugin_continentCode: continentCode,
			geoplugin_latitude: latitude,
			geoplugin_longitude: longitude,
			geoplugin_timezone: timezone,
			geoplugin_currencyCode: currencyCode,
			geoplugin_currencySymbol: currencySymbol
		} = res.data
		useAuth().setUserLocation({
			ip, latitude, longitude,
			city, state, stateCode, country, countryCode, continent,
			continentCode, currencyCode, currencySymbol, timezone
		})
	} catch (err) {}
})
