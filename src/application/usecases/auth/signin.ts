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
		loading: false,
		error: ''
	})
	const signin = async () => {
		state.error = ''
		state.loading = true
		try {
			const { idToken } = await SigninWithGoogle.call()
			await createSession(idToken)
		} catch (error) { state.error = error }
		state.loading = false
	}
	return { ...toRefs(state), signin }
}

export const useDevSignin = () => {
	const devs = ['kevin11', 'frank', 'joe', 'max']
	const state = reactive({
		loading: false,
		error: '',
		id: ''
	})
	const signin = async () => {
		state.error = ''
		state.loading = true
		try {
			if (state.id) await createSession(state.id)
			else state.error = 'Select a dev id first'
		} catch (error) { state.error = error }
		state.loading = false
	}
	return { ...toRefs(state), devs, signin }
}

export const useEmailSignin = () => {
	const state = reactive({
		loading: false,
		error: '',
		factory: GetEmailSigninFactory.call()
	})
	const signin = async () => {
		state.error = ''
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				const { idToken } = await SigninWithEmail.call(state.factory)
				await createSession(idToken)
			} catch (error) { state.error = error }
			state.loading = false
		} else state.factory.validateAll()
	}
	return { ...toRefs(state), signin }
}

export const useEmailSignup = () => {
	const state = reactive({
		loading: false,
		error: '',
		factory: GetEmailSignupFactory.call()
	})
	const signup = async () => {
		state.error = ''
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				const { idToken } = await SignupWithEmail.call(state.factory)
				await createSession(idToken)
			} catch (error) { state.error = error }
			state.loading = false
		} else state.factory.validateAll()
	}
	return { ...toRefs(state), signup }
}
