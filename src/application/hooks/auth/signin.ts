import { reqRef } from '@nuxtjs/composition-api'
import {
	SigninWithEmail, SigninWithGoogle, SignupWithEmail,
	EmailSignupFactory, EmailSigninFactory
} from '@modules/auth'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { createSession } from '@app/hooks/auth/session'

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
	const factory = reqRef(new EmailSigninFactory())
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
	const factory = reqRef(new EmailSignupFactory())
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
