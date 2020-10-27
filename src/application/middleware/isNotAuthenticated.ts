import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { GenerateLink } from '@utils/router'
import { useStore } from '@app/usecases/store'

export default defineNuxtMiddleware(({ store, redirect }) => {
	const { isLoggedIn } = useStore().auth(store)
	if (isLoggedIn.value)
		redirect(GenerateLink({ path: '/', root: true, differentSubdomain: true }))
})
