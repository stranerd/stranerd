import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { GenerateLink } from '@utils/router'

export default defineNuxtMiddleware(({ store, redirect }) => {
	const { 'auth/isLoggedIn': isLoggedIn } = store.getters
	if (isLoggedIn)
		redirect(GenerateLink({ path: '/', root: true, differentSubdomain: true }))
})
