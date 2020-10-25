import { Middleware } from '@nuxt/types'
import { GenerateLink } from '@utils/router'
import Cookie from 'cookie'
import { isServer, host } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'

const isAuthenticated: Middleware = ({ req, res, route, store, redirect }) => {
	const isLoggedIn = store.getters['auth/isLoggedIn']
	if (!isLoggedIn) {
		const path = isServer() ? req.headers.referer ?? '' : window.location.origin + route.fullPath
		if (isServer()) res.setHeader('Set-Cookie', serialize(REDIRECT_SESSION_NAME, path))
		else document.cookie = serialize(REDIRECT_SESSION_NAME, path)

		redirect(GenerateLink({ path: '/auth/signin', differentSubdomain: true }))
	}
}

export default isAuthenticated

const serialize = (name: string, value: string) => Cookie.serialize(name, value, {
	domain: host,
	maxAge: 24 * 60 * 60 * 100,
	sameSite: 'lax'
})
