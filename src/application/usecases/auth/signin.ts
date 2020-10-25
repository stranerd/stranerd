import { reactive, toRefs } from '@nuxtjs/composition-api'
import {
	GetLoginFactory,
	GetRegisterFactory,
	LoginWithEmail,
	LoginWithGoogle,
	RegisterWithEmail,
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
	const login = async () => {
		state.error = ''
		state.loading = true
		try {
			const { idToken } = await LoginWithGoogle.call()
			await createSession(idToken)
		} catch (error) { state.error = error }
		state.loading = false
	}
	return { ...toRefs(state), login }
}

export const useDevSignin = () => {
	const devs = ['kevin11', 'frank', 'joe', 'max']
	const state = reactive({
		loading: false,
		error: '',
		id: ''
	})
	const login = async () => {
		state.error = ''
		state.loading = true
		try {
			if (state.id) await createSession(state.id)
			else state.error = 'Select a dev id first'
		} catch (error) { state.error = error }
		state.loading = false
	}
	return { ...toRefs(state), devs, login }
}

export const useEmailSignin = () => {
	const state = reactive({
		loading: false,
		error: '',
		factory: GetLoginFactory.call()
	})
	const signin = async () => {
		state.error = ''
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				const { idToken } = await LoginWithEmail.call(state.factory)
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
		factory: GetRegisterFactory.call()
	})
	const signup = async () => {
		state.error = ''
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				const { idToken } = await RegisterWithEmail.call(state.factory)
				await createSession(idToken)
			} catch (error) { state.error = error }
			state.loading = false
		} else state.factory.validateAll()
	}
	return { ...toRefs(state), signup }
}
