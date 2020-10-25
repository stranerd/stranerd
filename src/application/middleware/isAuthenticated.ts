import { Middleware } from '@nuxt/types'
import { GenerateLink } from '@utils/router'

const isAuthenticated: Middleware = ({ store, redirect }) => {
	const isLoggedIn = store.getters['auth/isLoggedIn']
	if (!isLoggedIn) redirect(GenerateLink({ path: '/auth/signin', differentSubdomain: true }))
}

export default isAuthenticated
