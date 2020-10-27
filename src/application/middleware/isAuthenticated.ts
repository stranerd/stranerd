import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { GenerateLink } from '@utils/router'
import Cookie from 'cookie'
import { isServer, host, protocol } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import { useStore } from '@app/usecases/store'

export default defineNuxtMiddleware(({ store, req, res, route, redirect }) => {
	const { isLoggedIn } = useStore().auth(store)
	if (!isLoggedIn.value) {
		if (isServer()) {
			const path = protocol + req.headers.host + route.fullPath
			res.setHeader('Set-Cookie', serialize(REDIRECT_SESSION_NAME, path))
		} else {
			const path = window.location.origin + route.fullPath
			document.cookie = serialize(REDIRECT_SESSION_NAME, path)
		}
		redirect(GenerateLink({ path: '/auth/signin', differentSubdomain: true }))
	}
})

const serialize = (name: string, value: string) => Cookie.serialize(name, value, {
	domain: host,
	maxAge: 3600,
	sameSite: 'lax'
})
