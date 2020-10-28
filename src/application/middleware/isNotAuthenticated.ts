import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { GenerateLink } from '@utils/router'
import { useAuth } from '@app/usecases/auth/auth'

export default defineNuxtMiddleware(({ redirect }) => {
	if (useAuth().isLoggedIn.value)
		redirect(GenerateLink({ path: '/', root: true, differentSubdomain: true }))
})
