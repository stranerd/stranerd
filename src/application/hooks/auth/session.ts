import { SessionSignin, SessionSignout } from '@modules/auth'
import { GenerateLink } from '@utils/router'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { host, hostname, isClient, protocol } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import Cookie from 'cookie'

export const createSession = async (idToken: string) => {
	await SessionSignin.call(idToken)
	if (isClient()) {
		const { [REDIRECT_SESSION_NAME]: redirect } = Cookie.parse(document?.cookie ?? '') ?? {}
		document.cookie = Cookie.serialize(REDIRECT_SESSION_NAME, '', {
			domain: host, expires: new Date(0)
		})
		window.location.assign(redirect ?? protocol + hostname)
	}
}

export const useSessionSignout = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signout = async () => {
		setError('')
		setLoading(true)
		try {
			await SessionSignout.call()
			window.location.assign(GenerateLink({ path: '/auth/signin', differentSubdomain: true }))
		} catch (error) { setError(error) }
		setLoading(false)
	}

	return { loading, error, signout }
}
