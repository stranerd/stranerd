import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import Cookie from 'cookie'
import { isServer } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import { useAuth } from '@app/hooks/auth/auth'

export default defineNuxtMiddleware(({ res, route, redirect }) => {
	if (!useAuth().isLoggedIn.value) {
		if (isServer()) res.setHeader('Set-Cookie', serialize(REDIRECT_SESSION_NAME, route.fullPath))
		else document.cookie = serialize(REDIRECT_SESSION_NAME, route.fullPath)
		redirect('/auth/')
	}
})

const serialize = (name: string, value: string) => Cookie.serialize(name, value, {
	maxAge: 3600,
	path: '/',
	sameSite: 'lax'
})
