import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { GenerateLink } from '@utils/router'

export default defineNuxtMiddleware(({ store, redirect }) => {
	const isLoggedIn = store.getters['auth/isLoggedIn']
	if (isLoggedIn) redirect(GenerateLink({ path: '/', root: true, differentSubdomain: true }))
})
