import { Ref, ref, useRouter } from '@nuxtjs/composition-api'
import {
	EmailLinkSigninFactory, SendSigninEmail, SigninWithGoogle, SigninWithEmailLink
} from '@modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { createSession } from '@app/hooks/auth/session'
import { isClient } from '@utils/environment'
import { EMAIL_SIGNIN_STORAGE_KEY } from '@utils/constants'

export const useGoogleSignin = () => {
	const router = useRouter()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signin = async () => {
		setError('')
		if (!loading.value) {
			setLoading(true)
			try {
				const user = await SigninWithGoogle.call()
				await createSession(user, router)
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}
	return { loading, error, signin }
}

export const useSendEmailLink = () => {
	const factory = ref(new EmailLinkSigninFactory()) as Ref<EmailLinkSigninFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { message, setMessage } = useSuccessHandler()
	const sendSigninEmail = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const email = factory.value.email
				const redirectUrl = (isClient() ? window.location.origin : '') + '/auth/email-redirect'
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
	const router = useRouter()
	const factory = ref(new EmailLinkSigninFactory()) as Ref<EmailLinkSigninFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	const checkCachedEmail = async () => {
		if (isClient()) {
			const email = window.localStorage.getItem(EMAIL_SIGNIN_STORAGE_KEY)
			if (email) factory.value.email = email
			window.localStorage.removeItem(EMAIL_SIGNIN_STORAGE_KEY)
			await signin()
		}
	}

	const signin = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const url = isClient() ? window.location.href : ''
				const user = await SigninWithEmailLink.call(factory.value, url)
				await createSession(user, router)
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, error, signin, checkCachedEmail }
}
