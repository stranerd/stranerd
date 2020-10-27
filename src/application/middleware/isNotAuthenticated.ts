import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { GenerateLink } from '@utils/router'
import { useStore } from '@app/usecases/store'

export default defineNuxtMiddleware(({ redirect }) => {
	const isLoggedIn = useStore().auth().isLoggedIn
	if (isLoggedIn.value) redirect(GenerateLink({ path: '/', root: true, differentSubdomain: true }))
})
