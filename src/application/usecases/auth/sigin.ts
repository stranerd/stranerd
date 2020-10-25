import { reactive, toRefs } from '@nuxtjs/composition-api'
import { GetLoginFactory, GetRegisterFactory, LoginWithEmail, LoginWithGoogle, RegisterWithEmail } from '@modules/auth'
import { isDev } from '@utils/environment'

const createSession = async (id: string, idToken: string) => {
	console.log(id, idToken)
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
	return { ...toRefs(state), devs, isDev, login }
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
