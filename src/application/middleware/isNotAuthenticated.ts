import { Middleware } from '@nuxt/types'
import { GenerateLink } from '@utils/router'

const isNotAuthenticated: Middleware = ({ store, redirect }) => {
	const isLoggedIn = store.getters['auth/isLoggedIn']
	if (isLoggedIn) redirect(GenerateLink({ path: '/', root: true, differentSubdomain: true }))
}

export default isNotAuthenticated
