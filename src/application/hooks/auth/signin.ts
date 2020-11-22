import { reqRef } from '@nuxtjs/composition-api'
import {
	EmailLinkSigninFactory, EmailSignupFactory, EmailSigninFactory,
	SendSigninEmail, SigninWithEmail, SigninWithGoogle, SignupWithEmail, SigninWithEmailLink
} from '@modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { createSession } from '@app/hooks/auth/session'
import { GetFullLink } from '@utils/router'
import { isClient } from '@utils/environment'
import { EMAIL_SIGNIN_STORAGE_KEY } from '@utils/constants'

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

export const useSendEmailLink = () => {
	const factory = reqRef(new EmailLinkSigninFactory())
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { message, setMessage } = useSuccessHandler()
	const sendSigninEmail = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const email = factory.value.email
				const redirectUrl = GetFullLink({ path: '/auth/email-redirect' })
				await SendSigninEmail.call(factory.value, redirectUrl)
				if (isClient()) window.localStorage.setItem(EMAIL_SIGNIN_STORAGE_KEY, email)
				setMessage(`An email with a link to proceed has been sent to ${email}`)
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, error, message, sendSigninEmail }
}

export const useEmailLinkSignin = () => {
	const factory = reqRef(new EmailLinkSigninFactory())
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	const checkCachedEmail = () => {
		if (isClient()) {
			const email = window.localStorage.getItem(EMAIL_SIGNIN_STORAGE_KEY)
			if (email) factory.value.email = email
			window.localStorage.removeItem(EMAIL_SIGNIN_STORAGE_KEY)
		}
	}

	const signin = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const url = isClient() ? window.location.href : ''
				const { idToken } = await SigninWithEmailLink.call(factory.value, url)
				await createSession(idToken)
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, error, signin, checkCachedEmail }
}
