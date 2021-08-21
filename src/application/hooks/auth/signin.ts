import { Ref, ref, ssrRef, useRouter } from '@nuxtjs/composition-api'
import {
	EmailSigninFactory,
	EmailSignupFactory,
	SigninWithEmail,
	SigninWithGoogle,
	SignupWithEmail
} from '@modules/auth'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { createSession } from '@app/hooks/auth/session'
import { isClient } from '@utils/environment'

const global = {
	referrerId: ssrRef(undefined as string | undefined)
}

export const useGoogleSignin = () => {
	const router = useRouter()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signin = async () => {
		setError('')
		if (!loading.value) {
			setLoading(true)
			try {
				const user = await SigninWithGoogle.call({
					referrer: getReferrerId()
				})
				await createSession(user, router)
				if (isClient()) window.localStorage.removeItem('referrer')
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		}
	}
	return { loading, error, signin }
}

export const useEmailSignin = () => {
	const router = useRouter()
	const factory = ref(new EmailSigninFactory()) as Ref<EmailSigninFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signin = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const user = await SigninWithEmail.call(factory.value, {
					referrer: getReferrerId()
				})
				await createSession(user, router)
				if (isClient()) window.localStorage.removeItem('referrer')
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, error, signin }
}

export const useEmailSignup = () => {
	const router = useRouter()
	const factory = ref(new EmailSignupFactory()) as Ref<EmailSignupFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signup = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const user = await SignupWithEmail.call(factory.value, {
					referrer: getReferrerId()
				})
				await createSession(user, router)
				if (isClient()) window.localStorage.removeItem('referrer')
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, error, signup }
}

export const setReferrerId = (id: string) => {
	global.referrerId.value = id
	if (isClient()) window.localStorage.setItem('referrer', id)
}
export const saveReferrerId = () => {
	const id = getReferrerId()
	if (id && isClient()) window.localStorage.setItem('referrer', id)
}
export const getReferrerId = () => isClient()
	? (window.localStorage.getItem('referrer') ?? global.referrerId.value)
	: global.referrerId.value
