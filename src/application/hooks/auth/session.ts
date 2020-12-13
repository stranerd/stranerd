import { SessionSignin, SessionSignout } from '@modules/auth'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { isClient, isDev, isServer } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import Cookie from 'cookie'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'
import { useContext } from '@nuxtjs/composition-api'
import VueRouter from 'vue-router'

export const createSession = async (user: AfterAuthUser, router: VueRouter) => {
	await SessionSignin.call(isDev ? user.id : user.idToken)
	if (isClient()) {
		const { [REDIRECT_SESSION_NAME]: redirect } = Cookie.parse(document?.cookie ?? '') ?? {}
		document.cookie = Cookie.serialize(REDIRECT_SESSION_NAME, '', {
			expires: new Date(0)
		})
		if (router) await router.push(redirect ?? '')
	}
}

export const useSessionSignout = () => {
	const { app } = useContext()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signout = async () => {
		setError('')
		setLoading(true)
		try {
			await SessionSignout.call()
			if (app.router) await app.router.push('/auth/signin')
		} catch (error) { setError(error) }
		setLoading(false)
	}

	return { loading, error, signout }
}

export const useRedirectToAuth = () => {
	const { app, res, route } = useContext()

	const redirect = () => {
		if (isServer()) res.setHeader('Set-Cookie', serialize(REDIRECT_SESSION_NAME, route.value.fullPath))
		else document.cookie = serialize(REDIRECT_SESSION_NAME, route.value.fullPath)
		if (app.router) app.router.push('/auth/')
	}

	return { redirect }
}

const serialize = (name: string, value: string) => Cookie.serialize(name, value, {
	maxAge: 3600,
	sameSite: 'lax'
})
