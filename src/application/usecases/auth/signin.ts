import { reactive, toRefs } from '@nuxtjs/composition-api'
import {
	GetEmailSigninFactory,
	GetEmailSignupFactory,
	SigninWithEmail,
	SigninWithGoogle,
	SignupWithEmail,
	SessionSignin
} from '@modules/auth'
import { hostname, isClient, protocol, host } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import Cookie from 'cookie'
import { useErrorHandler } from '@app/usecases/core/states'

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
	const state = reactive({
		loading: false
	})
	const { error, setError } = useErrorHandler()
	const signin = async () => {
		setError('')
		state.loading = true
		try {
			const { idToken } = await SigninWithGoogle.call()
			await createSession(idToken)
		} catch (error) { setError(error) }
		state.loading = false
	}
	return { ...toRefs(state), error, signin }
}

export const useDevSignin = () => {
	const devs = ['kevin11', 'frank', 'joe', 'max']
	const state = reactive({
		loading: false,
		id: ''
	})
	const { error, setError } = useErrorHandler()
	const signin = async () => {
		setError('')
		state.loading = true
		try {
			if (state.id) await createSession(state.id)
			else setError('Select a dev id first')
		} catch (error) { setError(error) }
		state.loading = false
	}
	return { ...toRefs(state), error, devs, signin }
}

export const useEmailSignin = () => {
	const state = reactive({
		loading: false,
		factory: GetEmailSigninFactory.call()
	})
	const { error, setError } = useErrorHandler()
	const signin = async () => {
		setError('')
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				const { idToken } = await SigninWithEmail.call(state.factory)
				await createSession(idToken)
			} catch (error) { setError(error) }
			state.loading = false
		} else state.factory.validateAll()
	}
	return { ...toRefs(state), error, signin }
}

export const useEmailSignup = () => {
	const state = reactive({
		loading: false,
		factory: GetEmailSignupFactory.call()
	})
	const { error, setError } = useErrorHandler()
	const signup = async () => {
		setError('')
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				const { idToken } = await SignupWithEmail.call(state.factory)
				await createSession(idToken)
			} catch (error) { setError(error) }
			state.loading = false
		} else state.factory.validateAll()
	}
	return { ...toRefs(state), error, signup }
}
