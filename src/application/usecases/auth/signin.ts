import { reqRef } from '@nuxtjs/composition-api'
import {
	GetEmailSigninFactory, GetEmailSignupFactory, SigninWithEmail,
	SigninWithGoogle, SignupWithEmail, SessionSignin
} from '@modules/auth'
import { hostname, isClient, protocol, host } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import Cookie from 'cookie'
import { useErrorHandler, useLoadingHandler } from '@app/usecases/core/states'

const createSession = async (idToken: string) => {
	await SessionSignin.call(idToken)
	if (isClient()) {
		const { [REDIRECT_SESSION_NAME]: redirect } = Cookie.parse(document?.cookie ?? '') ?? {}
		document.cookie = Cookie.serialize(REDIRECT_SESSION_NAME, '', {
			domain: host, expires: new Date(0)
		})
		window.location.assign(redirect ?? protocol + hostname)
	} else window.location.assign(protocol + hostname)
}

export const useGoogleSignin = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signin = async () => {
		setError('')
		setLoading(true)
		try {
			const { idToken } = await SigninWithGoogle.call()
			await createSession(idToken)
		} catch (error) { setError(error) }
		setLoading(false)
	}
	return { loading, error, signin }
}

export const useDevSignin = () => {
	const devs = ['kevin11', 'frank', 'joe', 'max']
	const id = reqRef('')
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signin = async () => {
		setError('')
		setLoading(true)
		try {
			if (id.value) await createSession(id.value)
			else setError('Select a dev id first')
		} catch (error) { setError(error) }
		setLoading(false)
	}
	return { id, loading, error, devs, signin }
}

export const useEmailSignin = () => {
	const factory = reqRef(GetEmailSigninFactory.call())
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signin = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const { idToken } = await SigninWithEmail.call(factory.value)
				await createSession(idToken)
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, error, signin }
}

export const useEmailSignup = () => {
	const factory = reqRef(GetEmailSignupFactory.call())
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signup = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const { idToken } = await SignupWithEmail.call(factory.value)
				await createSession(idToken)
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, error, signup }
}
