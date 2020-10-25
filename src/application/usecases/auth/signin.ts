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

const createSession = async (id: string, idToken: string) => {
	await SessionSignin.call(id, idToken)
	if (isClient()) {
		const { [REDIRECT_SESSION_NAME]: redirect } = Cookie.parse(document?.cookie ?? '') ?? {}
		document.cookie = Cookie.serialize(REDIRECT_SESSION_NAME, '', {
			domain: host, expires: new Date(0)
		})
		window.location.assign(redirect ?? protocol + hostname)
	} else window.location.assign(protocol + hostname)
}

export const useGoogleLogin = () => {
	const state = reactive({
		loading: false,
		error: ''
	})
	const login = async () => {
		state.loading = true
		try {
			const { id, idToken } = await LoginWithGoogle.call()
			await createSession(id, idToken)
		} catch (error) { state.error = error }
		state.loading = false
	}
	return { ...toRefs(state), login }
}

export const useDevLogin = () => {
	const devs = ['kevin11', 'frank', 'joe', 'max']
	const state = reactive({
		loading: false,
		error: '',
		id: ''
	})
	const login = async () => {
		state.loading = true
		try {
			if (state.id) await createSession(state.id, state.id)
			else state.error = 'Select a dev id first'
		} catch (error) { state.error = error }
		state.loading = false
	}
	return { ...toRefs(state), devs, login }
}

export const useLoginForm = () => {
	const state = reactive({
		loading: false,
		error: '',
		factory: GetLoginFactory.call()
	})
	const login = async () => {
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				const { id, idToken } = await LoginWithEmail.call(state.factory)
				await createSession(id, idToken)
			} catch (error) { state.error = error }
			state.loading = false
		} else state.factory.validateAll()
	}
	return { ...toRefs(state), login }
}

export const useRegisterForm = () => {
	const state = reactive({
		loading: false,
		error: '',
		factory: GetRegisterFactory.call()
	})
	const register = async () => {
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				const { id, idToken } = await RegisterWithEmail.call(state.factory)
				await createSession(id, idToken)
			} catch (error) { state.error = error }
			state.loading = false
		} else state.factory.validateAll()
	}
	return { ...toRefs(state), register }
}
