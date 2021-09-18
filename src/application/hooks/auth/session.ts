import { SessionSignin } from '@modules/auth'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { isServer } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import Cookie from 'cookie'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'
import { useContext, useRouter } from '@nuxtjs/composition-api'
import VueRouter from 'vue-router'
import { useAuth } from '@app/hooks/auth/auth'
import { Alert } from '@app/hooks/core/notifications'
import { serialize } from '@utils/cookie'

export const createSession = async (afterAuth: AfterAuthUser, router: VueRouter) => {
	const authDetails = await SessionSignin.call(afterAuth)
	const { setAuthUser, signin, setTokens } = useAuth()
	await setTokens({ accessToken: afterAuth.accessToken, refreshToken: afterAuth.refreshToken })
	const isVerified = await setAuthUser(authDetails, router)
	if (!isVerified) return
	await signin(false, router)

	const { [REDIRECT_SESSION_NAME]: redirect } = Cookie.parse(document.cookie ?? '')
	document.cookie = Cookie.serialize(REDIRECT_SESSION_NAME, '', { expires: new Date(0) })
	await router.push(redirect ?? '/dashboard')
}

export const useSessionSignout = () => {
	const router = useRouter()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signout = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to sign out?',
			text: '',
			icon: 'info',
			confirmButtonText: 'Yes, signout'
		})
		if (accepted) {
			setLoading(true)
			try {
				await useAuth().signout(router)
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		}
	}

	return { loading, error, signout }
}

export const useRedirectToAuth = () => {
	const { app, res, route } = useContext()

	const redirect = () => {
		if (isServer()) res.setHeader('Set-Cookie', serialize(REDIRECT_SESSION_NAME, route.value.fullPath))
		else document.cookie = serialize(REDIRECT_SESSION_NAME, route.value.fullPath)
		if (app.router) app.router.push('/auth/signin')
	}

	return { redirect }
}
