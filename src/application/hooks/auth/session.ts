import { SessionSignin, SessionSignout } from '@modules/auth'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { isClient, isDev } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import Cookie from 'cookie'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'
import { useContext } from '@nuxtjs/composition-api'

export const createSession = async (user: AfterAuthUser) => {
	const { app } = useContext()
	await SessionSignin.call(isDev ? user.id : user.idToken)
	if (isClient()) {
		const { [REDIRECT_SESSION_NAME]: redirect } = Cookie.parse(document?.cookie ?? '') ?? {}
		document.cookie = Cookie.serialize(REDIRECT_SESSION_NAME, '', {
			expires: new Date(0)
		})
		if (app.router) await app.router.push(redirect ?? '')
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
